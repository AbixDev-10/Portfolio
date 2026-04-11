const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const readEnv = (key) =>
  (process.env[key] || "")
    .trim()
    .replace(/^['"]|['"]$/g, "");

const port = Number(readEnv("PORT")) || 5000;
const smtpHost = readEnv("SMTP_HOST");
const smtpPort = Number(readEnv("SMTP_PORT")) || 587;
const smtpUser = readEnv("SMTP_USER");
const smtpPass = readEnv("SMTP_PASS").replace(/\s+/g, "");
const mailTo = readEnv("MAIL_TO");
const mongoURI = readEnv("MONGODB_URI");

let mongoConnected = false;

const buildMongoFallbackUri = (uri) => {
  if (!uri.startsWith("mongodb+srv://")) {
    return null;
  }

  const directBase =
    "mongodb://portfolioUser:AbiportfolioUser@" +
    [
      "ac-vv4x2ru-shard-00-00.4gg8e09.mongodb.net:27017",
      "ac-vv4x2ru-shard-00-01.4gg8e09.mongodb.net:27017",
      "ac-vv4x2ru-shard-00-02.4gg8e09.mongodb.net:27017"
    ].join(",");

  return (
    `${directBase}/portfolioDB` +
    "?ssl=true&authSource=admin&replicaSet=atlas-ve2xiz-shard-0&retryWrites=true&w=majority"
  );
};

const connectToMongo = async () => {
  if (!mongoURI) {
    console.warn("MONGODB_URI is not set. Continuing without database connectivity.");
    return;
  }

  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000
    });
    mongoConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    const fallbackUri = buildMongoFallbackUri(mongoURI);
    const isSrvLookupIssue =
      mongoURI.startsWith("mongodb+srv://") &&
      (err.message.includes("querySrv") || err.message.includes("ECONNREFUSED"));

    if (!fallbackUri || !isSrvLookupIssue) {
      mongoConnected = false;
      console.error("MongoDB connection error:", err.message);
      console.error("Continuing without database connectivity.");
      return;
    }

    try {
      await mongoose.connect(fallbackUri, {
        serverSelectionTimeoutMS: 10000
      });
      mongoConnected = true;
      console.log("MongoDB connected using direct Atlas hosts");
    } catch (fallbackErr) {
      mongoConnected = false;
      console.error("MongoDB SRV connection error:", err.message);
      console.error("MongoDB direct connection error:", fallbackErr.message);
      console.error("Continuing without database connectivity.");
    }
  }
};

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://your-portfolio.vercel.app"
    ],
    credentials: true
  })
);
app.use(express.json());

// Keep the API available even if MongoDB is temporarily unreachable.
connectToMongo();

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    message: "Server is running",
    services: {
      database: mongoConnected ? "connected" : "disconnected"
    }
  });
});

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required."
    });
  }

  const missingMailEnv = [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
    "MAIL_TO"
  ].filter((key) => !readEnv(key));

  if (missingMailEnv.length > 0) {
    return res.status(500).json({
      success: false,
      message: `Missing server email config: ${missingMailEnv.join(", ")}`
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${smtpUser}>`,
      to: mailTo,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <h2>New message from your portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully."
    });
  } catch (error) {
    console.error("Email send failed:", error);

    const isAuthError =
      error.code === "EAUTH" ||
      error.responseCode === 535 ||
      (typeof error.response === "string" &&
        error.response.includes("BadCredentials"));

    return res.status(500).json({
      success: false,
      message: isAuthError
        ? "SMTP authentication failed. Check SMTP_USER and SMTP_PASS (use Gmail App Password)."
        : "Unable to send message right now. Please try again later."
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

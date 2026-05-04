const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

/* -------------------------------------------
   Helper Function
-------------------------------------------- */
const readEnv = (key) =>
  (process.env[key] || "")
    .trim()
    .replace(/^['"]|['"]$/g, "");

/* -------------------------------------------
   Environment Variables
-------------------------------------------- */
const port = Number(readEnv("PORT")) || 5000;

const smtpHost = readEnv("SMTP_HOST");
const smtpPort = Number(readEnv("SMTP_PORT")) || 587;
const smtpUser = readEnv("SMTP_USER");
const smtpPass = readEnv("SMTP_PASS").replace(/\s+/g, "");
const mailTo = readEnv("MAIL_TO");

const mongoURI = readEnv("MONGODB_URI");

const frontendUrl =
  readEnv("FRONTEND_URL") || "http://localhost:5173";

/* -------------------------------------------
   MongoDB Connection State
-------------------------------------------- */
let mongoConnected = false;

/* -------------------------------------------
   MongoDB Connection
-------------------------------------------- */
const connectToMongo = async () => {
  if (!mongoURI) {
    console.warn(
      "⚠️ MONGODB_URI is missing. Running without MongoDB."
    );
    return;
  }

  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000
    });

    mongoConnected = true;

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    mongoConnected = false;

    console.error("❌ MongoDB Connection Error:");
    console.error(error.message);

    console.log("⚠️ Server will continue without database.");
  }
};

/* -------------------------------------------
   Allowed Frontend Origins
-------------------------------------------- */
const allowedOrigins = [
  "http://localhost:5174",
"http://127.0.0.1:5174",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  frontendUrl
].filter(Boolean);

/* -------------------------------------------
   Middleware
-------------------------------------------- */
app.use(
  cors({
    origin(origin, callback) {
      // Allow requests with no origin
      if (!origin) {
        return callback(null, true);
      }

      // Allow frontend origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error("❌ Blocked by CORS:", origin);

      return callback(
        new Error(`CORS blocked origin: ${origin}`)
      );
    },

    credentials: true
  })
);

app.use(express.json());

/* -------------------------------------------
   Connect MongoDB
-------------------------------------------- */
connectToMongo();

/* -------------------------------------------
   Root Route
-------------------------------------------- */
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend Server Running Successfully"
  });
});

/* -------------------------------------------
   Health Route
-------------------------------------------- */
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    message: "Server is running",
    services: {
      database: mongoConnected
        ? "connected"
        : "disconnected"
    }
  });
});

/* -------------------------------------------
   Contact Route
-------------------------------------------- */
app.post("/api/contact", async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message
    } = req.body || {};

    /* -------------------------------------------
       Validation
    -------------------------------------------- */
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required."
      });
    }

    /* -------------------------------------------
       Email Config Validation
    -------------------------------------------- */
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
        message: `Missing email server config: ${missingMailEnv.join(
          ", "
        )}`
      });
    }

    /* -------------------------------------------
       Create Mail Transporter
    -------------------------------------------- */
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,

      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    /* -------------------------------------------
       Send Email
    -------------------------------------------- */
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${smtpUser}>`,
      to: mailTo,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,

      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,

      html: `
        <h2>New Portfolio Contact Message</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Subject:</strong> ${subject}</p>

        <p><strong>Message:</strong></p>

        <p>${message.replace(/\n/g, "<br/>")}</p>
      `
    });

    /* -------------------------------------------
       Success Response
    -------------------------------------------- */
    return res.status(200).json({
      success: true,
      message: "Message sent successfully."
    });
  } catch (error) {
    console.error("❌ Email Send Failed:");
    console.error(error);

    const isAuthError =
      error.code === "EAUTH" ||
      error.responseCode === 535 ||
      (typeof error.response === "string" &&
        error.response.includes("BadCredentials"));

    return res.status(500).json({
      success: false,

      message: isAuthError
        ? "SMTP authentication failed. Use Gmail App Password instead of your normal password."
        : "Unable to send message right now. Please try again later."
    });
  }
});

/* -------------------------------------------
   Start Server
-------------------------------------------- */
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
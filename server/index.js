const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const readEnv = (key) => (process.env[key] || "").trim().replace(/^['"]|['"]$/g, "");
const port = Number(readEnv("PORT")) || 5000;
const smtpHost = readEnv("SMTP_HOST");
const smtpPort = Number(readEnv("SMTP_PORT") || 587);
const smtpUser = readEnv("SMTP_USER");
const smtpPass = readEnv("SMTP_PASS").replace(/\s+/g, "");
const mailTo = readEnv("MAIL_TO");

app.use(cors());
app.use(express.json());

const requiredEnvVars = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "MAIL_TO"];
const missingEnvVars = requiredEnvVars.filter((key) => !readEnv(key));

if (missingEnvVars.length > 0) {
  console.warn(`Missing environment variables: ${missingEnvVars.join(", ")}`);
}

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: smtpUser,
    pass: smtpPass
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required."
    });
  }

  try {
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
    console.error("Email send failed:", {
      code: error.code,
      responseCode: error.responseCode,
      command: error.command,
      response: error.response
    });

    const isAuthError =
      error.code === "EAUTH" ||
      error.responseCode === 535 ||
      (typeof error.response === "string" && error.response.includes("BadCredentials"));

    return res.status(500).json({
      success: false,
      message: isAuthError
        ? "SMTP authentication failed. Check SMTP_USER and SMTP_PASS (for Gmail, use a 16-character App Password)."
        : "Unable to send message right now. Please try again later."
    });
  }
});

app.listen(port, () => {
  console.log(`Mail server running on http://localhost:${port}`);
  transporter
    .verify()
    .then(() => {
      console.log("SMTP connection verified.");
    })
    .catch((error) => {
      console.error("SMTP verify failed:", {
        code: error.code,
        responseCode: error.responseCode,
        command: error.command,
        response: error.response
      });
    });
});

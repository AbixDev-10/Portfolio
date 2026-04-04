const nodemailer = require("nodemailer");

const readEnv = (key) => (process.env[key] || "").trim().replace(/^['"]|['"]$/g, "");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed."
    });
  }

  const smtpHost = readEnv("SMTP_HOST");
  const smtpPort = Number(readEnv("SMTP_PORT") || 587);
  const smtpUser = readEnv("SMTP_USER");
  const smtpPass = readEnv("SMTP_PASS").replace(/\s+/g, "");
  const mailTo = readEnv("MAIL_TO");

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !mailTo) {
    return res.status(500).json({
      success: false,
      message: "Server email configuration is incomplete."
    });
  }

  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required."
    });
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
};

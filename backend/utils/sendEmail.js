// utils/sendEmail.js
import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_EMAIL, // Gmail ya SMTP user
        pass: process.env.SMTP_PASS, // Gmail App Password
      },
    });

    await transporter.sendMail({
      from: `"PdfToCsv" <${process.env.SMTP_EMAIL}>`,
      to,
      subject,
      text,
    });

    console.log("✅ Email sent successfully");
  } catch (err) {
    console.error("❌ Email not sent", err);
    throw new Error("Email could not be sent");
  }
};

export default sendEmail;

const nodemailer = require("nodemailer");
const { senderEmail, emailPassword } = require("../config/keys");

const sendEmail = async ({ emailTo, subject, code, content }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: senderEmail,
        pass: emailPassword,
      },
    });

    const message = {
      to: emailTo,
      from: "121hasasa@gmail.com",
      subject,
      html: `
        <div style="font-family: Arial; line-height: 1.5">
          <h3>${content}</h3>
          <p><strong>Verification Code:</strong> ${code}</p>
        </div>
      `,
    };

    await transporter.sendMail(message);
    console.log(" Email sent successfully to:", emailTo);
  } catch (error) {
    console.error(" Email send failed:", error.message);
    throw error;
  }
};

module.exports = sendEmail;

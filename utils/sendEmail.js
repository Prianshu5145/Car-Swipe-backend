const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables from .env

const sendEmail = async (options) => {
  // Create a transporter object using GoDaddy SMTP
  const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net", // GoDaddy SMTP server
    port: 465, // Secure SSL port
    secure: true, // Use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email options with fixed CC and optional attachment
  const mailOptions = {
    from: `"CAR SWIPE" <team@carswipe.in>`,
    to: options.email,
    cc: "support@carswipe.in", // ✅ Fixed CC address
    subject: options.subject,
    html: `
      <p>${options.message}</p>
      <br>
      <p>-------------------------------------------------------------------------------------------</p>
      <p style="font-size: 1.8em; font-weight: bold;">CAR SWIPE SERVICES PVT LTD.</p>
      <p style="font-size: 1em; color: #0078D7;">TICK TOCK SOLD!!</p>
      
      <p><strong>📞 </strong> 9792983625</p>
      <p>📍 Taukalpur Nagra, Surapur, Kadipur, Sultanpur, Uttar Pradesh, 228161</p>
      
      <br>
      <p><em>This email and its contents are confidential.</em></p>
    `,
    attachments: options.attachmentPath
      ? [
          {
            filename: options.attachmentName || "document.pdf",
            path: options.attachmentPath,
          },
        ]
      : [],
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

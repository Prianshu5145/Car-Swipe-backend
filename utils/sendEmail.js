const fs = require("fs");
const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.EMAIL_API_KEY);

const sendEmail = async (options) => {
  try {
    let attachments = [];

    // If there's an attachment, encode it in base64
    if (options.attachmentPath) {
      const pdfBuffer = fs.readFileSync(options.attachmentPath);
      const pdfBase64 = pdfBuffer.toString("base64");

      attachments.push({
        filename: options.attachmentName || "document.pdf",
        content: pdfBase64,
      });
    }

    const { data, error } = await resend.emails.send({
      from: "CAR SWIPE <team@carswipe.in>",
      to: [options.email],
      cc: ["support@carswipe.in"],
      subject: options.subject,
      html: `
        <p>${options.message}</p>
        <br>
        <hr style="border: 0; border-top: 1px solid #ddd;">
        <p style="font-size: 1.5em; font-weight: bold;">CAR SWIPE SERVICES PVT LTD.</p>
        <p style="font-size: 1em; color: #0078D7;">TICK TOCK SOLD!!</p>
        <p><strong>📞</strong> 9792983625</p>
        <p>📍 Car Swipe Services Pvt Ltd, Taukalpur Nagra, Surapur, Kadipur, Sultanpur, Uttar Pradesh, 228161</p>
         <p><strong>🌐</strong> <a href="https://carswipe.in/" target="_blank">www.carswipe.in</a></p>
        <br>
        <p><em>This email and its contents are confidential.</em></p>
      `,
      attachments,
    });

    if (error) {
      console.error("❌ Error sending email:", error);
      throw new Error(error.message);
    }

    console.log("✅ Email sent successfully:", data);
  } catch (err) {
    console.error("❌ sendEmail failed:", err.message);
  }
};

module.exports = sendEmail;

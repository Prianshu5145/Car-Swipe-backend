const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.EMAIL_API_KEY);

const sendEmail = async (options) => {
  try {
    // Build HTML body
    const emailBody = `
      <p>${options.message.replace(/\n/g, "<br>")}</p>
      <br>
      <hr>
      <p style="font-size: 1.5em; font-weight: bold;">CAR SWIPE SERVICES PVT LTD.</p>
      <p style="font-size: 1em; color: #0078D7;">TICK TOCK SOLD!!</p>
      <p><strong>📞 </strong> 9792983625</p>
      <p>📍Car Swipe Services Pvt Ltd, Taukalpur Nagra, Surapur, Kadipur, Sultanpur, Uttar Pradesh, 228161</p>
      <br>
      <p><em>This email and its contents are confidential.</em></p>
    `;

    // Prepare attachments if any
    const attachments = options.attachmentPath
      ? [
          {
            filename: options.attachmentName || "document.pdf",
            path: options.attachmentPath,
          },
        ]
      : [];

    // Send email via Resend API
    const response = await resend.emails.send({
      from: `CAR SWIPE <team@carswipe.in>`,
      to: options.email,
      cc: "support@carswipe.in",
      subject: options.subject,
      html: emailBody,
      attachments:
        attachments.length > 0
          ? attachments.map((file) => ({
              filename: file.filename,
              path: file.path,
            }))
          : undefined,
    });

    console.log("✅ Email sent successfully:", response);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw new Error("Email sending failed");
  }
};

module.exports = sendEmail;

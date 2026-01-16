import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendRfpEmail(to, rfp) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `RFP: ${rfp.title}`,
    text: `
${rfp.description}

Budget: ${rfp.budget}
Delivery: ${rfp.deliveryDays} days
Payment: ${rfp.paymentTerms}
Warranty: ${rfp.warranty}

Items:
${rfp.items.map((i) => `- ${i.name} x${i.quantity} (${i.specs})`).join("\n")}

Please reply with your proposal.
`,
  };

  await transporter.sendMail(mailOptions);
}

export { sendRfpEmail };

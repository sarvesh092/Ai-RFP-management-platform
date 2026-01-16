import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateStructuredRfp(userInput) {
  const prompt = `
You are an enterprise procurement assistant.

Convert the following procurement request into STRICT JSON.
If information is missing, infer reasonable defaults.

Required JSON format:
{
  "title": "",
  "description": "",
  "budget": number,
  "deliveryDays": number,
  "paymentTerms": "",
  "warranty": "",
  "items": [
    { "name": "", "quantity": number, "specs": "" }
  ]
}

Procurement Request:
${userInput}

Return ONLY valid JSON. No explanation.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  return JSON.parse(response.choices[0].message.content);
}
async function parseVendorProposal(text) {
  const prompt = `
Extract proposal details from the vendor response below.

Return STRICT JSON:
{
  "totalPrice": number,
  "deliveryDays": number,
  "paymentTerms": "",
  "warranty": ""
}

Vendor Response:
${text}

Return ONLY JSON.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
  });

  return JSON.parse(response.choices[0].message.content);
}
async function recommendVendor(rfp, proposals) {
  const prompt = `
You are a procurement decision assistant.

Given the RFP and vendor proposals below, recommend the best vendor.
Explain your reasoning clearly and mention trade-offs.

RFP:
${JSON.stringify(rfp, null, 2)}

Proposals:
${JSON.stringify(proposals, null, 2)}

Return STRICT JSON:
{
  "recommendedVendor": "",
  "reasoning": "",
  "considerations": []
}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  return JSON.parse(response.choices[0].message.content);
}

export { generateStructuredRfp, parseVendorProposal, recommendVendor };

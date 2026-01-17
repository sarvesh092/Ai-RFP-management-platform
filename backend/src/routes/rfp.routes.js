import express from "express";
const router = express.Router();
import Rfp from "../models/rfp.model.js";
import { generateStructuredRfp } from "../services/ai.js";

router.post("/generate", async (req, res) => {
  try {
    const { text } = req.body;

    const structured = await generateStructuredRfp(text);

    const rfp = await Rfp.create(structured);

    res.json(rfp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate RFP" });
  }
});

router.get("/", async (req, res) => {
  const rfps = await Rfp.find().sort({ createdAt: -1 });
  res.json(rfps);
});

router.get("/:id", async (req, res) => {
  try {
    const rfp = await Rfp.findById(req.params.id);
    if (!rfp) return res.status(404).json({ error: "RFP not found" });
    res.json(rfp);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch RFP" });
  }
});

export default router;

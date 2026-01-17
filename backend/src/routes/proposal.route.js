import express from "express";
import Proposal from "../models/proposal.model.js";
import { parseVendorProposal, recommendVendor } from "../services/ai.js";
import Rfp from "../models/rfp.model.js";

const router = express.Router();

router.post("/parse", async (req, res) => {
  const { rfpId, vendorId, text } = req.body;

  const parsed = await parseVendorProposal(text);

  const proposal = await Proposal.create({
    rfpId,
    vendorId,
    rawText: text,
    ...parsed,
  });

  res.json(proposal);
});

router.get("/:rfpId", async (req, res) => {
  const proposals = await Proposal.find({ rfpId: req.params.rfpId }).populate(
    "vendorId",
    "name"
  );
  console.log(proposals);
  res.json(proposals);
});

router.post("/recommend/:rfpId", async (req, res) => {
  const rfp = await Rfp.findById(req.params.rfpId);
  const proposals = await Proposal.find({ rfpId: req.params.rfpId }).populate(
    "vendorId",
    "name"
  );

  const aiResult = await recommendVendor(rfp, proposals);

  res.json(aiResult);
});

export default router;

import express from "express";
import Vendor from "../models/vendor.model.js";
import { sendRfpEmail } from "../services/mail.services.js";
import Rfp from "../models/rfp.model.js";

const router = express.Router();

router.post("/:id/send", async (req, res) => {
  const rfp = await Rfp.findById(req.params.id);
  const vendors = await Vendor.find({ _id: { $in: req.body.vendorIds } });

  for (const vendor of vendors) {
    await sendRfpEmail(vendor.email, rfp);
  }

  rfp.status = "SENT";
  await rfp.save();

  res.json({ success: true });
});
export default router;
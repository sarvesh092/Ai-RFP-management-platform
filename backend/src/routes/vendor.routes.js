import express from "express";
import Vendor from "../models/vendor.model.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const vendor = await Vendor.create(req.body);
  res.json(vendor);
});

router.get("/", async (req, res) => {
  const vendors = await Vendor.find();
  res.json(vendors);
});

export default router;

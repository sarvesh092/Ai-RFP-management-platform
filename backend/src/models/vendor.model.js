import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", VendorSchema);

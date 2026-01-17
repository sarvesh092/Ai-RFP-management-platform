import mongoose from "mongoose";

const ProposalSchema = new mongoose.Schema(
  {
    rfpId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rfp",
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
    totalPrice: Number,
    deliveryDays: Number,
    paymentTerms: String,
    warranty: String,
    rawText: String,
  },
  { timestamps: true }
);

export default mongoose.model("Proposal", ProposalSchema);

import mongoose from "mongoose";

const ProposalSchema = new mongoose.Schema(
  {
    rfpId: mongoose.Schema.Types.ObjectId,
    vendorId: mongoose.Schema.Types.ObjectId,
    totalPrice: Number,
    deliveryDays: Number,
    paymentTerms: String,
    warranty: String,
    rawText: String,
  },
  { timestamps: true }
);

export default mongoose.model("Proposal", ProposalSchema);

import mongoose from "mongoose";

const RfpSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    budget: Number,
    deliveryDays: Number,
    paymentTerms: String,
    warranty: String,
    items: [
      {
        name: String,
        quantity: Number,
        specs: String,
      },
    ],
    status: {
      type: String,
      default: "CREATED",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Rfp", RfpSchema);

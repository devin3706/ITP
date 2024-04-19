import mongoose from "mongoose";

const { Schema } = mongoose;

const payerSchema = new Schema(
  {
    payerName: {
      type: String,
      required: true,
    },
    cardNo: {
      type: Number,
      required: true,
    },
    nic: {
      type: Number,
      required: true,
    },
    cvv: {
      type: Number,
      required: true,
    },
    expiryDate: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payer", payerSchema);
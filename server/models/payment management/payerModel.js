import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const Payer = mongoose.model("Payer", payerSchema);

export default Payer;

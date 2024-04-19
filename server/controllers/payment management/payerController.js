import Payer from "../../models/payment management/payerModel.js";
import mongoose from "mongoose";

// get all payers
const getPayers = async (req, res) => {
  const payers = await Payer.find({}).sort({ createdAt: -1 });

  res.status(200).json(payers);
};

// get a single payer
const getPayer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such payer" });
  }

  const payer = await Payer.findById(id);

  if (!payer) {
    return res.status(404).json({ error: "No such payer" });
  }

  res.status(200).json(payer);
};

// create new payer
const createPayer = async (req, res) => {
  const { payerName, cardNo, nic, cvv, expiryDate } = req.body;

  // add doc to db
  try {
    const payer = await Payer.create({
      payerName,
      cardNo,
      nic,
      cvv,
      expiryDate,
    });
    res.status(200).json("payer add una");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a payer
const deletePayer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such payer" });
  }

  const payer = await Payer.findOneAndDelete({ _id: id });

  if (!payer) {
    return res.status(400).json({ error: "No such payer" });
  }

  res.status(200).json(payer);
};

//update a payer
const updatePayer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such payer" });
  }

  const payer = await Payer.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!payer) {
    return res.status(400).json({ error: "No such payer" });
  }

  res.status(200).json(payer);
};

export {
  getPayers,
  getPayer,
  createPayer,
  deletePayer,
  updatePayer,
};
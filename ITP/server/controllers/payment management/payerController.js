import Payer from "../../models/payment management/payerModel.js";
import mongoose from "mongoose";

// get all payers
const getPayers = async (req, res) => {
  try {
    const payers = await Payer.find({}).sort({ createdAt: -1 });
    res.status(200).json(payers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get a single payer
const getPayer = async (req, res) => {
  const { Payerid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(Payerid)) {
    return res.status(404).json({ error: "No such payer" });
  }

  const payer = await Payer.findById(Payerid);

  if (!payer) {
    return res.status(404).json({ error: "No such payer" });
  }

  res.status(200).json(payer);
};

// create new payer
const createPayer = async (req, res) => {
  const { payerName, cardNo, nic, amount, date } = req.body;

  // add doc to db
  try {
    const payer = await Payer.create({
      payerName,
      cardNo,
      nic,
      amount,
      date,
    });
    res.status(200).json("payer add una");
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

// delete a payer
const deletePayer = async (req, res) => {
  const { Payerid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(Payerid)) {
    return res.status(404).json({ error: "No such payer" });
  }

  const payer = await Payer.findOneAndDelete({ _id: Payerid });

  if (!payer) {
    return res.status(400).json({ error: "No such payer" });
  }

  res.status(200).json(payer);
};

//update a payer
const updatePayer = async (req, res) => {
  const { Payerid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(Payerid)) {
    return res.status(404).json({ error: "No such payer" });
  }

  const payer = await Payer.findOneAndUpdate(
    { _id: Payerid },
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

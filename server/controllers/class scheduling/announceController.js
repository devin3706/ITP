import Announce from "../../models/class scheduling/announceModel.js";
import mongoose from "mongoose";

const getannounces = async (req, res) => {
  try {
    const announces = await Announce.find({}).sort({ createdAt: -1 });
    res.status(200).json(announces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getannounce = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid announcement ID" });
  }

  try {
    const announceItem = await Announce.findById(id);
    if (!announceItem) {
      return res.status(404).json({ error: "Announcement not found" });
    }
    res.status(200).json(announceItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createannounce = async (req, res) => {
  const { TeacherNameID, SubjectSubjectID, Announcement } = req.body;

  try {
    const newAnnounce = await Announce.create({
      TeacherNameID,
      SubjectSubjectID,
      Announcement,
    });
    res.status(201).json(newAnnounce);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteannounce = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid announcement ID" });
  }

  try {
    const deletedAnnounce = await Announce.findByIdAndDelete(id);
    if (!deletedAnnounce) {
      return res.status(404).json({ error: "Announcement not found" });
    }
    res.status(200).json(deletedAnnounce);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update a announcement
const updateannounce = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such announcement" });
  }

  const announce = await Announce.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!announce) {
    return res.status(400).json({ error: "No such announcement" });
  }

  res.status(200).json(announce);
};

export { getannounces, getannounce, createannounce, deleteannounce, updateannounce };

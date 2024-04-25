import InquiryModel from '../../models/student support/Inquiry.js';

// Get all inquiries
export const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await InquiryModel.find({});
        res.json(inquiries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get inquiry by ID
export const getInquiryById = async (req, res) => {
    try {
        const { id } = req.params;
        const inquiry = await InquiryModel.findById(id);
        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }
        res.json(inquiry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update inquiry by ID
export const updateInquiryById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedInquiry = await InquiryModel.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedInquiry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create new inquiry
export const createInquiry = async (req, res) => {
    try {
        const newInquiry = await InquiryModel.create(req.body);
        res.status(201).json(newInquiry);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete inquiry by ID
export const deleteInquiryById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedInquiry = await InquiryModel.findByIdAndDelete(id);
        if (!deletedInquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }
        res.json(deletedInquiry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
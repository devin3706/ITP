import express from 'express';
import { getAllInquiries, getInquiryById, updateInquiryById, createInquiry, deleteInquiryById } from '../../controllers/student support/InquiryController.js';

const router = express.Router();

router.get('/', getAllInquiries);
router.get('/:id', getInquiryById);
router.put('/update/:id', updateInquiryById);
router.post('/create', createInquiry);
router.delete('/delete/:id', deleteInquiryById);

export default router;
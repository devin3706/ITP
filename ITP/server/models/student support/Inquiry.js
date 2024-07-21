import mongoose from 'mongoose';

const { Schema } = mongoose;

const inquirySchema = new Schema({
    Email: {
        type: String,
        required: true
    },
    Teacher: {
        type: String,
        required: true
    },
    Class: {
        type: String,
        required: true
    },
    Question: {
        type: String,
        required: true
    },
});

const InquiryModel = mongoose.model('inquiry', inquirySchema);

export default InquiryModel;
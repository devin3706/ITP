import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const questionSchema = new Schema({
    studentName: {
        type: String,
        required: true
    },
    studentID: {
        type: String,
        required: true
    },
    classSelect: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    photo: {
        type: String // Store the file path as a string
    }
});

const QuestionModel = model('inquary', questionSchema);

export default QuestionModel;

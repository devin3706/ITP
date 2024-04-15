const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new mongoose.Schema({
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

const QuestionModel = mongoose.model('inquary', questionSchema);

module.exports = QuestionModel;
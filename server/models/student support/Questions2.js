import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const QuestionSchema = new Schema({
    studentName: String,
    studentId: String,
    classSelect: String,
    question: String,
    photo: String
});

const QuestionModel = model("questions2", QuestionSchema);

export default QuestionModel;

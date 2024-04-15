const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new mongoose.Schema({
    studentName: String,
    studentId: String,
    classSelect: String,
    question: String,
    photo: null
});

//const QuestionModel = mongoose.model("feedback",QuestionSchema)
module.exports =  mongoose.model("questions1",QuestionSchema)
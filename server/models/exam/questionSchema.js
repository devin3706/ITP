import mongoose from "mongoose";
const { Schema } = mongoose;

//question model
const questionModel = new Schema({
    examName: { type: String, required: true },
    questions : {type : Array, default: []},
    answers : { type : Array, default: []},
    createdAt : {type : Date, default: Date.now}
});

export default mongoose.model('Question', questionModel)
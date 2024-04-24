import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {type: String,required: true, unique: true},
    email: {type: String,required: true, unique: true},
    number: {type: String,required: true, unique: true},
    password: {type: String,required: true},
    school: {type: String,required: true, unique: true},
    address: {type: String,required: true, unique: true},
})

const StudentModel = mongoose.model("Student", studentSchema)

export {StudentModel as Student};
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: Number,
    password: String,
    school: String,
    address: String,
});

const StudentModel = mongoose.model("students", studentSchema);

export default StudentModel;

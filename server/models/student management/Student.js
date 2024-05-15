import mongoose from 'mongoose';

const { Schema } = mongoose;

const studentSchema = new Schema({
    name: String,
    email: String,
    number: Number,
    password: String,
    school: String,
    address: String,
});

const StudentModel = mongoose.model("students", studentSchema);

export default StudentModel;
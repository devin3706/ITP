import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
    Name: String,
    StudentId: String,
    Teacher: String,
    Feedback: String,
    Rating: Number
});

export default mongoose.model("feedback", UserSchema);
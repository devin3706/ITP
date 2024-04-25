import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
    Name: String,
    Email: String,
    Teacher: String,
    Feedback: String,
    Rating: Number
});

const UserModel = mongoose.model('feedback', UserSchema);

export default UserModel;


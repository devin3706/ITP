import mongoose from 'mongoose';

const { Schema } = mongoose;

const bsmarksSchema = new Schema({
    name: String,
    email: String,
    marks: Number,
});

const BSMarksModel = mongoose.model("BSMarks", bsmarksSchema);

export default BSMarksModel;
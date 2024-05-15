import mongoose from 'mongoose';

const { Schema } = mongoose;

const attendanceSchema = new Schema({
    image: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    batch: {
        type: String,
        required: true,
    },
});

const AttendanceModel = mongoose.model("attendance", attendanceSchema);

export default AttendanceModel;

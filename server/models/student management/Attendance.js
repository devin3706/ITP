import mongoose from 'mongoose';

const { Schema } = mongoose;

const attendanceSchema = new Schema({
    image: String,
});

const AttendanceModel = mongoose.model("attendance", attendanceSchema);

export default AttendanceModel;
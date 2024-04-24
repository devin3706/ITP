import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const studentLoginSchema = new Schema({
    studentEmail: {
        type: String,
        ref: 'StudentModel',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const SLogins = model('SLogins', studentLoginSchema);
export default SLogins;

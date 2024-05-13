import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const teacherLoginSchema = new Schema({
    teacherEmail: {
        type: String,
        ref: 'Teacher',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const TLogins = model('TLogins', teacherLoginSchema);
export default TLogins;

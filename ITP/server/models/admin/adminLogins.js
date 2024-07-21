import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const adminLoginSchema = new Schema({
    adminEmail: {
        type: String,
        ref: 'Admin',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const ALogins = model('ALogins', adminLoginSchema);
export default ALogins;

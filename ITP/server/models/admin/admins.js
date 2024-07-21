import mongoose from 'mongoose';
import {v1 as uuidv1} from 'uuid';
import crypto from 'crypto';

const { Schema } = mongoose;

const adminSchema = new Schema(
    {
        adminID:{
            type: Number,
            required: true,
            unique: true,
        },
        fName: {
            type: String,
            required: true,
            trim: true,
        },
        lName: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        contact: {
            type: Number,
            required: true,
            trim: true,
            unique: true,
        },
        hashedPassword: {
            type: String,
            required: true,
        },
        salt: String,
    },
    {
        timestamps: true,
    }
);

// Virtual field
adminSchema.virtual("password").set(function (password) {
    // Create temp variable
    this._password = password;

    // Generate timestamp
    this.salt = uuidv1();

    // Encrypt password
    this.hashedPassword = this.encryptPassword(password);
});

// Methods
adminSchema.methods = {
    encryptPassword: function (password) {
        if(!password) return "";

        try {
            return crypto
                .createHmac("sha256", this.salt)
                .update(password)
                .digest('hex');
        } catch(err) {
            console.error("Error in encrypting password: ", err);
            return "";
        }
    },

    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },
};

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;

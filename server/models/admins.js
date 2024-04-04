const mongoose = require('mongoose');
const uuidv1 = require('uuidv1');
const crypto = require('crypto');

const adminSchema = new mongoose.Schema(
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

//virtual field
adminSchema.virtual("password").set(function (password) {
    //create temp variable
    this._password = password;

    //generate timestamp
    this.salt = uuidv1();

    //encrypt password
    this.hashedPassword = this.encryptPassword(password);
});

//methods
adminSchema.methods = {
    encryptPassword: function (password) {
        if(!password) return "";

        try {
            return crypto
                .createHmac("sha256", this.salt)
                .update(password)
                .digest('hex');

        }catch(err){
            console.error("Error in encrypting password: ", err)
            return "";

        }
    },

    authenticate: function (plainText) {
        //const hashedPassword = this.encryptPassword(plainText);
        return this.encryptPassword(plainText) === this.hashedPassword;
    },
};



module.exports = mongoose.model("Admin", adminSchema);
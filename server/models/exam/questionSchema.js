import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the schema for the question model
const questionSchema = new Schema({
    examName: { 
        type: String, 
        required: [true, 'Exam name is required'] // Validation for required field
    },
    questions : {
        type : [{
            id: { type: Number, required: true },
            question: { type: String, required: true },
            options: { 
                type: [String], 
                required: true,
                validate: [optionsLengthValidator, 'Options must be an array with exactly 3 elements'] // Custom validation for array length
            },
        }],
        required: true,
        validate: [arrayLengthValidator, 'Questions must be an array with exactly 5 elements'] // Custom validation for array
    },
    answers : {
        type : [Number], 
        required: true,
        validate: [arrayLengthValidator, 'Answers must be an array with exactly 5 elements'] // Custom validation for array
    },
    createdAt : {
        type : Date, 
        default: Date.now // Default value
    }
});

// Custom validator function for array length
function arrayLengthValidator(val) {
    return Array.isArray(val) && val.length === 5;
}

// Custom validator function for options array length
function optionsLengthValidator(val) {
    return Array.isArray(val) && val.length === 3;
}

// Create the Question model based on the schema
const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);

export default Question;
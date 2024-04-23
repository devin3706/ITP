import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the schema for the question model
const questionSchema = new Schema({
    examName: { 
        type: String, 
        required: [true, 'Exam name is required'] // Validation for required field
    },
    questions : {
        type : Array, 
        default: [], // Default value
        validate: [arrayValidator, 'Questions must be a non-empty array'] // Custom validation for array
    },
    answers : {
        type : Array, 
        default: [] // Default value
    },
    createdAt : {
        type : Date, 
        default: Date.now // Default value
    }
});

// Custom validator function for array
function arrayValidator(val) {
    return Array.isArray(val) && val.length > 0;
}

// Create the Question model based on the schema
const Question = mongoose.model('Question', questionSchema);

export default Question;
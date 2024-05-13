import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the schema for the result model
const resultSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'] // Validation for required field
    },
    result: {
        type: Array,
        default: [] // Default value
    },
    attempts: {
        type: Number,
        default: 0,
        min: [0, 'Attempts must be a non-negative number'], // Validation for minimum value
        max: [5, 'Attempts cannot exceed 5'] // Validation for maximum value
    },
    points: {
        type: Number,
        default: 0,
        min: [0, 'Points must be a non-negative number'] // Validation for minimum value
    },
    achieved: {
        type: String,
        default: '',
        enum: ['Passed', 'Failed'], // Validation for allowed values
        required: [true, 'Achieved status is required'] // Validation for required field
    },
    createdAt: {
        type: Date,
        default: Date.now // Default value
    }
});

// Create the Result model based on the schema
const Result = mongoose.model('Result', resultSchema);

export default Result;

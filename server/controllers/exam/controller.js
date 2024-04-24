import Questions from "../../models/exam/questionSchema.js"
import Results from "../../models/exam/resultSchema.js";


//get all questions
export async function getQuestions(req, res){
    try{
        const q = await Questions.find()
        res.json(q)
    } catch (error) {
        res.json({ error })
    }
}

//get question by id
export async function getQuestionById(req, res) {
    try {
        const questionId = req.params.id;
        const question = await Questions.findById(questionId);
        if (!question) {
            return res.status(404).json([]);
        }
        res.json([question]); // Wrap the question object inside an array
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

//insert all questions
export async function insertQuestions(req, res) {
    try {
        const { examName, questions, answers } = req.body; // Extract questions and answers from request body

        if (!examName || !questions || !answers || questions.length !== answers.length) {
            throw new Error('Invalid data provided');
        }

        const insertedQuestions = await Questions.create({ examName, questions, answers }); // Create a new document using Mongoose model
        res.json({ msg: "Data Saved Successfully...!", data: insertedQuestions });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to insert questions" });
    }
}

//delete all questions
export async function dropQuestions(req, res) {
    const questionId = req.body.questionId; // Get the question id from the request body

    try {
        // Find the question by id and delete it
        const deletedQuestion = await Questions.findByIdAndDelete(questionId);

        if (!deletedQuestion) {
            return res.status(404).json({ error: "Question not found" });
        }

        res.json({ msg: "Question deleted successfully", deletedQuestion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

//get all result
export async function getResult(req,res){
    try {
        const r = await Results.find()
        res.json(r)
    } catch (error) {
        res.json({error})
    }
}

//post all results
export async function storeResult(req, res) {
    try {
        const { username, result, attempts, points, achieved } = req.body;
        if (!username || !result) {
            throw new Error('Data not provided');
        }

        const createdResult = await Results.create({ username, result, attempts, points, achieved });
        res.json({ msg: "Results saved successfully", data: createdResult });
    } catch (error) {
        res.status(500).json({ error: error.message || "Failed to store result" });
    }
}

//update results
export async function updateResult(req, res) {
    try {
        const { _id, username, result, attempts, points, achieved } = req.body;
        // Find the existing result by ID
        const existingResult = await Results.findById(_id);
        if (!existingResult) {
            throw new Error('Result not found'); // Handle case where result doesn't exist
        }

        // Update the fields (only if provided in the request)
        if (username !== undefined) {
            existingResult.username = username;
        }
        if (result !== undefined) {
            existingResult.result = result;
        }
        if (attempts !== undefined) {
            existingResult.attempts = attempts;
        }
        if (points !== undefined) {
            existingResult.points = points;
        }
        if (achieved !== undefined) {
            existingResult.achieved = achieved;
        }

        // Save the updated result
        const updatedResult = await existingResult.save();

        res.json({ msg: "Result updated successfully", data: updatedResult });
    } catch (error) {
        res.status(500).json({ error: error.message || "Failed to update result" });
    }
}

//delete all result
export async function dropResult(req, res){
    try {
        const { _id } = req.body;
        if (!_id) {
            throw new Error('Invalid data provided: _id is missing');
        }

        // Delete the result by _id
        await Results.deleteOne({ _id });
        res.json({ msg: "Result deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message || "Failed to delete result" });
    }
}
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from 'axios'

export function attempts_Number(result) {
    return result.filter(r => r !== undefined).length;
}

export function earnPoints_Number(result, answers, point){
    return result.map((element, i) => answers[i] == element).filter(i => i).map(i => point).reduce((prev, curr) => prev + curr, 0);
}

export function flagResult(totalPoints, earnPoints) {
    return (totalPoints * 50 / 100) < earnPoints; //earn 50 marks
}

//check user auth
export function CheckUserExist({ children }){
    const auth = useSelector(state => state.result.userId)
    return auth ? children : <Navigate to={'/'} replace={true}> </Navigate>
}

//get server data
export async function getServerData(url, callback){
    const data = await (await axios.get(url))?.data;
    return callback ? callback (data) : data;
    
} 

//post server data
export async function postServerData(url, result, callback){
    const data = await (await axios.post(url, result))?.data;
    return callback ? callback (data) : data;
} 

//update server data
export async function putServerData(url, result, callback) {
    try {
        const response = await axios.put(url, result);
        const data = response.data;
        return callback ? callback(data) : data;
    } catch (error) {
        console.error('Error updating result:', error);
        // Handle the error appropriately (e.g., show a message to the user)
        throw error; // Rethrow the error to be caught by the caller
    }
}

//delete server data
export async function deleteServerData(url, _id) {
    try {
        const response = await axios.delete(url, { data: { _id } });
        return response.data
    } catch (error) {
        console.error('Error while deleting data:', error);
        throw error;
    }
}

//post questions and answers
export const handleChangeQuestion = (questions, setQuestions, index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };
  
  export const handleChangeOption = (questions, setQuestions, questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };
  
  export const handleChangeAnswer = (answers, setAnswers, index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  export const handleAddQuestion = async (examName, questions, answers) => {
    try {
      // Check if all questions and answers are provided
      if (questions.some(question => !question.question || question.options.some(option => !option)) || answers.some(answer => answer === null)) {
        throw new Error('Please provide all questions, options, and answers');
      }
  
      const data = { examName, questions, answers };
  
      // Send POST request to backend
      const response = await axios.post('http://localhost:8081/api/questions', data);
  
      // Optionally, display a success message to the user
      alert('Questions added successfully!');

    } catch (error) {
      console.error('Error adding questions:', error.message);
      // Optionally, display an error message to the user
      alert('Failed to add questions. Please try again.');
    }
  };

  //delete exam
  export async function dropQuestion(questionId) {
    try {
        // Send a DELETE request to the backend endpoint with the questionId
        const response = await axios.delete('http://localhost:8081/api/questions', { data: { questionId } });

        // If the request is successful, return the response data
        return response.data;
    } catch (error) {
        // If there's an error, log it and return null
        console.error('Error dropping question:', error);
        return null;
    }
}

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

//redux actions
import * as Action from '../redux/question_reducer'
import { getServerData} from "../helper/helper"

// Shuffle function
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
};

//fetch question hook to fetch api data and set value to store
export const useFetchQuestion = () => {
    const dispatch = useDispatch(); 
    const examId = useSelector(state => state.examId.examId);
    const [getData, setGetData] = useState({ isLoading: false, apiData: [], serverError: null });

    useEffect(() => {
        setGetData(prev => ({...prev, isLoading: true}));

        (async () => {
            try {
                const [{ questions, answers, ...rest }] = await getServerData(`http://localhost:8081/api/questions/${examId}`);

                if (questions.length > 0) {
                    // Combine questions and answers into a single array for shuffling
                    const combinedData = questions.map((question, index) => ({
                        ...question,
                        correctAnswerIndex: answers[index] // Add correct answer index to each question
                    }));
                    
                    // Shuffle the combined data
                    const shuffledData = shuffleArray(combinedData);

                    // Extract shuffled questions and answers from the shuffled data
                    const shuffledQuestions = shuffledData.map(question => ({
                        ...question,
                        correctAnswerIndex: undefined // Remove correct answer index from shuffled questions
                    }));
                    const shuffledAnswers = shuffledData.map(question => question.correctAnswerIndex);

                    setGetData(prev => ({...prev, isLoading: false}));
                    setGetData(prev => ({...prev, apiData: { questions: shuffledQuestions, answers: shuffledAnswers }}));
                    dispatch(Action.startExamAction({ question: shuffledQuestions, answers: shuffledAnswers }));
                } else {
                    throw new Error("No Questions Available");
                }
            } catch (error) {
                setGetData(prev => ({...prev, isLoading: false}));
                setGetData(prev => ({...prev, serverError: error}));
            }
        })();
    }, [dispatch]);

    return [getData, setGetData];
};

//moveAction dispatch function
export const MoveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction()); //increase trace by 1
    } catch (error) {
        console.log(error)
    }
}

//prevAction dispatch function
export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction()); //decrease trace by 1
    } catch (error) {
        console.log(error)
    }
}
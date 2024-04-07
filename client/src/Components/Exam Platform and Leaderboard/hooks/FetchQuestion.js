import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

//redux actions
import * as Action from '../redux/question_reducer'
import { getServerData } from "../helper/helper"


//fetch question hook to fetch api data and set value to store
export const useFetchQuestion = () => {
    const dispatch = useDispatch(); 
    const [getData, setGetData] = useState ( { isLoading : false, apiData : [], serverError : null});

    useEffect(()=>{
        setGetData(prev => ({...prev, isLoading : true}));

        //async function fetch backend data
        (async () => {
            try{
                const [{ questions, answers }] = await getServerData('http://localhost:8081/api/questions')

                if(questions.length > 0){
                    setGetData(prev => ({...prev, isLoading : false}))
                    setGetData(prev => ({...prev, apiData : {questions, answers}}))

                    //dispatch an action
                    dispatch(Action.startExamAction({ question : questions, answers }))
                } else {
                    throw new Error ("No Questions Avaliable")
                }
            } catch (error) {
                setGetData(prev => ({...prev, isLoading : false}))
                setGetData(prev => ({...prev, serverError : error}))
            }
        })();
    },  [dispatch]);

    return [getData, setGetData];
}

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
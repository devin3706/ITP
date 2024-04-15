import React, { useEffect, useState } from 'react'
import Questions from './Questions'

import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion'
import { PushAnswer } from '../hooks/setResult';

//redux store import
import {useSelector, useDispatch} from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function Quiz(){

    const [check, setChecked] = useState(undefined)

    const state = useSelector(state => state)
    const result = useSelector(state => state.result.result)
    const { queue, trace } = useSelector(state => state.questions)
    const dispatch = useDispatch()

    function onNext(){

        if(trace < queue.length)

        //increase trace value by 1 using moveNextAction
        dispatch(MoveNextQuestion());

        //insert a new result in the array
        if(result.length <= trace) {
            dispatch(PushAnswer(check))
        }

        //reset the value of the checked variable
        setChecked(undefined)
    }

    function onPrev(){
        if (trace > 0) {
            //reduce trace value by 1 using movePrevAction
            dispatch(MovePrevQuestion());
        }
        
    }

    function onChecked(check){
        setChecked(check)
    }

    //finished exam after the last question
    if(result.length && result.length >= queue.length) {
        return <Navigate to={'/result'} replace="true"></Navigate>
    }

    return(
        <div className=""> 
            <h1 className='title text-dark text-center mt-5'>A/L Accounting Mock Test 01</h1>

           <Questions onChecked={onChecked}> </Questions>

            <div className='grid'>
                {trace > 0 ? <button className='btn prev ml-4' onClick={onPrev}> Previous </button> : <div></div>}
                <button className='btn next ml-4' onClick={onNext}> Next </button>
            </div>
        
         </div>
        
    )
}
import React, {useRef} from 'react'
import {Link} from 'react-router-dom'
import '../styles/Main.css'
import { useDispatch } from 'react-redux'
import { setUserId } from '../redux/result_reducer'

export default function Main(){

    const inputRef = useRef(null)
    const dispatch = useDispatch()

    function startQuiz(){
        if(inputRef.current?.value){
             dispatch(setUserId(inputRef.current?.value))
        }
    }

    return (
        <div>
            <h1 className="title text-dark text-center mt-5">A/L Accounting Mock Test 01</h1>

        <div className="position-absolute top-50 start-50 translate-middle">
            <ol className='text-justify'>
            <li>Ensure a stable internet connection throughout the exam to avoid any disruptions. </li>
            <li>Have your student ID and any required materials ready before starting. </li>
            <li>Read each question carefully and review your answers before submission. </li>
            <li>Keep track of time and allocate it wisely across all questions. </li>
            <li>Do not navigate away from the exam page or open new tabs unless instructed. </li>
            </ol>

            <form id='form'>
                <input ref={inputRef} type="text" className="userid" placeholder='Username*'></input>
            </form>

            <div className='mt-5' style={{marginLeft: '38%'}}>
                <Link className='' to={'quiz'} onClick={startQuiz}>Start Exam</Link>
                <span className='p-3'></span>
                <Link className='' to={'tHome'} onClick={startQuiz}>Test</Link>
            </div>

        </div>
    </div>
    )
}
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';
import { resetAllAction } from '../redux/question_reducer';
import { resetResultAction } from '../redux/result_reducer';
import { usePublishResult } from '../hooks/setResult';
import Footer from './Footer';
import Header from './Header';

export default function Result(){

    const dispatch = useDispatch();
    const { questions : {queue, answers}, result : { result, userId}} = useSelector(state => state);

    const totalPoints = queue.length * 10;
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 10);
    const flag = flagResult(totalPoints, earnPoints);

    //store user result
    usePublishResult({ result,
         username : userId,
         attempts,
         points : earnPoints,
         achieved : flag ? "Passed" : "Failed"});

    function onRestart(){
        dispatch(resetAllAction());
        dispatch(resetResultAction());
    }

    return(
        <div style={{backgroundColor: '#ECF0F5'}}>
            <Header/>
            <div className='container text-center'> 
                <h1 className='alert alert-info border border-primary mt-5'> Results </h1>
                <div className='text-center fw-bolder'>
                <div className='mt-5'>
                    <span>Username :</span>
                    <span className='ml-2 fw-bold'>{userId}</span>
                </div>
                <div className='mt-2'>
                    <span>Total Marks :</span>
                    <span className='ml-2 fw-bold'>{totalPoints || 0}</span>
                </div>
                <div className='mt-2'>
                    <span>Earned Marks :</span>
                    <span className='ml-2 fw-bold'>{earnPoints || 0}</span>
                </div>
                <div className='mt-2'>
                    <span>Result :</span>
                    <span style={{ color: `${flag ? "#2aff95" : "#ff2a66"}` }} className='fw-bold ml-2'>{flag ? "Passed" : "Failed"}</span>
                </div>
            </div>
            <div className="start mt-5">
                <Link className='btn btn-sm btn-outline-primary' to={'/studentInterface'} onClick={onRestart}>Back to Start</Link>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
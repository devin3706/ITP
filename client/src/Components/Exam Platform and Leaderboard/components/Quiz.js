import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Questions from './Questions';
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion';
import { PushAnswer } from '../hooks/setResult';
import { updateResultAction } from '../redux/result_reducer';
import Header from './Header';
import Footer from './Footer';

const QUIZ_DURATION_SECONDS = 60;

const Quiz = () => {
    const [check, setChecked] = useState(undefined);
    const [timer, setTimer] = useState(QUIZ_DURATION_SECONDS);
    const [timerActive, setTimerActive] = useState(true);
    const state = useSelector(state => state);
    const result = useSelector(state => state.result.result);
    const { queue, trace } = useSelector(state => state.questions);
    const dispatch = useDispatch();

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    clearInterval(countdownInterval);
                    setTimerActive(false);
                    handleTimerExpire();
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, []);

    const onNext = () => {
        if (trace < queue.length) {
            dispatch(MoveNextQuestion());
            if (result.length <= trace) {
                dispatch(PushAnswer(check));
            }
            setChecked(undefined);
        }
    };

    const onPrev = () => {
        if (trace > 0) {
            dispatch(MovePrevQuestion());
        }
    };

    const onChecked = check => {
        setChecked(check);
        if (trace === queue.length - 1) {
            // If it's the last question, don't auto-submit
            return;
        }
        dispatch(PushAnswer(check));
    };

    const handleTimerExpire = () => {
        // Submit answers when timer expires
        dispatch(PushAnswer(check));
        // Update Redux store with submitted answers
        dispatch(updateResultAction({ result }));
    };

    // Determine button text based on whether it's the last question or not
    const buttonText = trace === queue.length - 1 ? 'Submit' : 'Next';

    const onClickNext = () => {
        if (trace === queue.length - 1) {
            handleTimerExpire();
        } else {
            onNext();
        }
    };

    // Navigate to the result page if the quiz is completed or timer expires
    if ((result.length && result.length >= queue.length) || timer === 0) {
        return <Navigate to={'/result'} replace="true"></Navigate>;
    }

    return (
        <div style={{backgroundColor: '#ECF0F5'}}>
            <Header/>
            <div className="container">
                <h1 className="alert alert-primary p-3 mt-5 text-center  border border-primary">A/L Accounting Mock Test 01</h1>

                <div className="d-inline text-info-emphasis bg-info-subtle rounded-3 p-2">Timer: {timer} seconds</div>

                <Questions onChecked={onChecked} />

                <div className="">
                    {trace > 0 ? (
                        <button className="btn prev btn-grey" onClick={onPrev}>
                            Previous
                        </button>
                    ) : (
                        <div></div>
                    )}
                    <button className="btn next btn-primary" onClick={onClickNext} disabled={!timerActive}>
                        {buttonText}
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Quiz;
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Questions from './Questions';
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion';
import { PushAnswer } from '../hooks/setResult';
import { updateResultAction } from '../redux/result_reducer';

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
        <div className="container">
            <h1 className="title text-light">A/L Accounting Mock Test 01</h1>

            <div className="timer">Timer: {timer} seconds</div>

            <Questions onChecked={onChecked} />

            <div className="grid">
                {trace > 0 ? (
                    <button className="btn prev" onClick={onPrev}>
                        Previous
                    </button>
                ) : (
                    <div></div>
                )}
                <button className="btn next" onClick={onClickNext} disabled={!timerActive}>
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default Quiz;
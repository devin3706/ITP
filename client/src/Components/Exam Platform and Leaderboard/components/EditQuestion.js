import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchQuestion } from '../hooks/FetchQuestion';
import { updateResult } from '../hooks/setResult';
import '../styles/EditQuestion.css'

export default function Questions({ onChecked }) {
    const [checked] = useState(undefined);
    const { trace } = useSelector(state => state.questions);
    const [{ isLoading, serverError }] = useFetchQuestion();
    const questions = useSelector(state => state.questions.queue);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateResult({ trace, checked }));
    }, [checked, dispatch, trace]);

    function handleInputChange(index, e) {
        const { name, value } = e.target;
        const updatedQuestions = [...questions];
        updatedQuestions[index][name] = value;
        dispatch(updateResult({ trace, checked }));
    }

    if (isLoading) return <h3 className='text-light'>Loading...</h3>;
    if (serverError) return <h3 className='text-light'>{serverError.message || "Unknown Error"}</h3>;

    return (
        <div className='questions'>
            {questions.map((q, index) => (
                <div key={index} className="question-container">
                    <h2 className='text-light'>Question {index + 1}</h2>
                    <input className='question-input'
                        type="text" 
                        value={q.question} 
                        name={`question${index}`} 
                        onChange={(e) => handleInputChange(index, e)} 
                        placeholder="Enter question" 
                        
                    />
                    <ul>
                        {q.options.map((option, i) => (
                            <li key={i}>
                                <input className='option-input'
                                    type="text"
                                    value={option}
                                    name={`option${index}-${i}`}
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder={`Enter option ${i + 1}`}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

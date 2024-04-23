import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchQuestion } from '../hooks/FetchQuestion';
import { updateResult } from '../hooks/setResult';
import Header from './Header';
import Footer from './Footer';

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
        <div style={{backgroundColor: '#ECF0F5'}}>
        <Header/>
        <div className="container py-5">
            <div className='row justify-content-center'>
                {questions.map((q, index) => (
                    <div key={index} className="col-md-8">
                        <div className="card border-0 shadow mb-4">
                            <div className="card-body">
                                <h2 className='card-title mt-0 mb-4'>Question {index + 1}</h2>
                                <input className='form-control mb-4'
                                    type="text"
                                    value={q.question}
                                    name={`question${index}`}
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder="Enter question"
                                />
                                <ul className='list-unstyled'>
                                    {q.options.map((option, i) => (
                                        <li key={i} className="mb-3">
                                            <input className='form-control'
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <Footer/>
        </div>
    );
}

import React, { useEffect, useState } from 'react';
<<<<<<< Updated upstream
import { useDispatch, useSelector } from 'react-redux';
import { useFetchQuestion } from '../hooks/FetchQuestion';
import { updateResult } from '../hooks/setResult';
import Header from './Header';
import Footer from './Footer';
=======
import { Link } from 'react-router-dom';
import '../styles/EditQuestion.css';
import { getServerData } from '../helper/helper';
import { useSelector } from 'react-redux';
import { dropQuestion } from '../helper/helper';
>>>>>>> Stashed changes

export default function Questions({ onChecked }) {
    const [questionsData, setQuestionsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [serverError, setServerError] = useState(null);
    const examId = useSelector(state => state.examId.examId);

    useEffect(() => {
        getQuestionsData();
    }, []);

    const getQuestionsData = async () => {
        try {
            setIsLoading(true);
            const response = await getServerData(`http://localhost:8081/api/questions/${examId}`);
            setQuestionsData(response);
            setIsLoading(false);
        } catch (error) {
            setServerError(error);
            setIsLoading(false);
        }
    };

    const handleDeleteQuestion = async () => {
        try {
            await dropQuestion(examId);
            console.log('Questions deleted successfully');
        } catch (error) {
            console.error('Error deleting questions:', error);
        }
    };

    if (isLoading) return <h3 className='text-light'>Loading...</h3>;
    if (serverError) return <h3 className='text-light'>{serverError.message || "Unknown Error"}</h3>;

    return (
<<<<<<< Updated upstream
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
=======
        <div className='questions'>
            {questionsData.map((exam, examIndex) => (
                <div key={examIndex}>
                    <h2>{exam.examName}</h2>
                    {exam.questions.map((question, questionIndex) => (
                        <div key={questionIndex} className="question-container">
                            <h3>Question {question.id}</h3>
                            <p>{question.question}</p>
                            <ul>
                                {question.options.map((option, optionIndex) => (
                                    <li key={optionIndex}>
                                        <input
                                            type="text"
                                            value={option}
                                            readOnly
                                        />
                                    </li>
                                ))}
                            </ul>
                            <p>Answer: {question.options[exam.answers[questionIndex]]}</p>
                        </div>
                    ))}
                </div>
            ))}
            <Link to="/teacherInterface" className="back-button">Back</Link> 
            <Link to="/teacherInterface" className="delete-button" onClick={handleDeleteQuestion}>Delete</Link>
>>>>>>> Stashed changes
        </div>
    );
}
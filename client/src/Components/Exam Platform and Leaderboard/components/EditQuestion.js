import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getServerData } from '../helper/helper';
import { useSelector } from 'react-redux';
import { dropQuestion } from '../helper/helper';
import Header from './Header';
import Footer from './Footer';

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
        <div style={{backgroundColor: '#ECF0F5'}}>
            <Header/>
            <div className="container py-5">
                <div className='row justify-content-center'>
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
                </div>
            </div>
            <Footer/>
            <Link to="/teacherInterface">Back</Link> 
            <Link to="/teacherInterface" onClick={handleDeleteQuestion}>Delete</Link>
        </div>
    );
}
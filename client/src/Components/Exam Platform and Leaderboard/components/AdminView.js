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

    const handleDeleteQuestion = async (event) => {
        const confirmDelete = window.confirm('Are you sure you want to delete all questions for this exam?');

        if (!confirmDelete) {
            event.preventDefault(); // Prevent the default behavior of the link
        } else {
            try {
                await dropQuestion(examId);
                console.log('Questions deleted successfully');
            } catch (error) {
                console.error('Error deleting questions:', error);
            }
        }
    };

    if (isLoading) return <h3 className='text-light'>Loading...</h3>;
    if (serverError) return <h3 className='text-light'>{serverError.message || "Unknown Error"}</h3>;

    return (
        <div style={{backgroundColor: '#ECF0F5'}}>
            <Header/>
            <div className="headerBtns">
              <Link to='/adminHome' className="btn btn-grey fs-6">Admin Dashboard</Link>
            </div>
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
                                                {option}
                                            </li>
                                        ))}
                                    </ul>
                                    <p>Answer: {question.options[exam.answers[questionIndex]]}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="row justify-content-between">
                    <div className="col-auto">
                        <Link to="/adminInterface" className="btn btn-primary">Back</Link>
                    </div>
                    <div className="col-auto">
                        <Link to="/adminInterface" onClick={handleDeleteQuestion} className="btn btn-danger">Delete</Link>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
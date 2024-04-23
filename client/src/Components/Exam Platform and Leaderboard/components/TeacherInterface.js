import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { getServerData } from '../helper/helper.js';
import { setExamId } from '../actions/id_actions.js'; // Import setExamId action creator
import '../styles/Interface.css';
import { Link } from 'react-router-dom';

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const dispatch = useDispatch(); // Initialize useDispatch

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const data = await getServerData('http://localhost:8081/api/questions');
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }

    fetchQuestions();
  }, []);

  const handleAttemptClick = (examId) => {
    dispatch(setExamId(examId)); // Dispatch action to update exam ID in Redux store
  };

  return (
    <div className="question-list-container">
      {questions.map(question => (
        <div key={question._id} className="question-container">
          <h2>{question.examName}</h2>
          <div className="button-container">
            {/* Pass examId to handleAttemptClick */}
            <Link className="action-button" to={'/editQuestion'} onClick={() => handleAttemptClick(question._id)}>View</Link>
            <Link className="action-button" to={'/test'}>Results</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionPage;
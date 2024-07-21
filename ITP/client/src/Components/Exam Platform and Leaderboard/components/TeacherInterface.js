import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { getServerData } from '../helper/helper.js';
import { setExamId } from '../actions/id_actions.js'; // Import setExamId action creator
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.js';
import Header from '../components/Header.js';
import SideNavbar from '../../Teacher Management/component/SideNavbar.jsx';

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
    <div style={{ backgroundColor: '#ECF0F5' }}>
      <div>
        <Header />
        <SideNavbar />
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-12 mb-4"> {/* Full-width column */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Create Exam</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <Link className="btn btn-primary" to={'/createQuestion'}>Create Exam</Link> 
                </div>
              </div>
            </div>
          </div>
          {questions.map(question => (
            <div key={question._id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{question.examName}</h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <Link className="btn btn-primary" to={'/editQuestion'} onClick={() => handleAttemptClick(question._id)}>View</Link>
                    <Link className="btn btn-secondary" to={'/test'}>Results</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default QuestionPage;
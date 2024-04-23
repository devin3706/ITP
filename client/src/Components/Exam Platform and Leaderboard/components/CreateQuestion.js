import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleChangeQuestion, handleChangeOption, handleChangeAnswer, handleAddQuestion} from '../helper/helper';
import Header from './Header';
import Footer from './Footer';

const AddQuestionPage = () => {
  const [examName, setExamName] = useState('');
  const [questions, setQuestions] = useState([
    { id: 1, question: '', options: ['', '', ''] },
    { id: 2, question: '', options: ['', '', ''] },
    { id: 3, question: '', options: ['', '', ''] },
    { id: 4, question: '', options: ['', '', ''] },
    { id: 5, question: '', options: ['', '', ''] },
  ]);
  const [answers, setAnswers] = useState([null, null]);
  const dispatch = useDispatch();

  const handleAddQuestionClick = () => {
    handleAddQuestion(examName, questions, answers, setQuestions, setAnswers);
    // Clear input fields after successful addition
    setExamName('');
    setQuestions(questions.map(question => ({ ...question, question: '', options: ['', '', ''] })));
    setAnswers(answers.map(() => null));
  }
  
  return (
    <div style={{backgroundColor: '#ECF0F5'}}>
      <Header/>
      <div className='container text-center col-8'>
        <h2 className="alert alert-info border border-primary mt-4">Add Questions</h2>
        <div className="input-group mt-5">
        <label className="input-group-text text-bg-secondary border border-dark w-15">Exam Name:</label>
        <input 
          type="text" 
          value={examName} 
          onChange={(e) => setExamName(e.target.value)} 
        />
      </div>
        {questions.map((question, questionIndex) => (
          <div key={question.id} className="form-group text-center">
            <div className="input-group mt-5">
              <label className="input-group-text text-bg-secondary border border-dark w-15">Question {questionIndex + 1}:</label>
              <input 
                type="text"
                className='form-control border border-dark'
                value={question.question} 
                onChange={(e) => handleChangeQuestion(questions, setQuestions, questionIndex, e.target.value)} 
              />
            </div>
            <div className="input-group align-items-center mt-3">
              <label className="input-group-text text-bg-secondary border border-dark w-15">Options:</label>
              {question.options.map((option, optionIndex) => (
                <input 
                  key={optionIndex}
                  type="text"
                  className='form-control border border-dark'
                  value={option} 
                  onChange={(e) => handleChangeOption(questions, setQuestions, questionIndex, optionIndex, e.target.value)} 
                />
              ))}
            </div>
            <div className="input-group mt-3">
              <label className="input-group-text text-bg-secondary border border-dark w-15">Correct Answer:</label>
              <input 
                type="number"
                className='form-control border border-dark'
                value={answers[questionIndex] !== null ? answers[questionIndex] : ''} 
                onChange={(e) => handleChangeAnswer(answers, setAnswers, questionIndex, parseInt(e.target.value))} 
              />
            </div>
          </div>
        ))}
        <button className="btn btn-primary mt-3 mb-5" onClick={handleAddQuestionClick}>Add Questions</button>
      </div>
      <Footer/>
    </div>
  );
}

export default AddQuestionPage;
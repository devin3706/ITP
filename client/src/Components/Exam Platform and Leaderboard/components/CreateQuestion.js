// fetchQuestion.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleChangeQuestion, handleChangeOption, handleChangeAnswer, handleAddQuestion} from '../helper/helper';
import '../styles/CreateQuestion.css'; 

const AddQuestionPage = () => {
  const [questions, setQuestions] = useState([
    { id: 1, question: '', options: ['', '', ''] },
    { id: 2, question: '', options: ['', '', ''] },
    { id: 3, question: '', options: ['', '', ''] },
    { id: 4, question: '', options: ['', '', ''] },
    { id: 5, question: '', options: ['', '', ''] },
  ]);
  const [answers, setAnswers] = useState([null, null]);
  const dispatch = useDispatch();

  const handleAddQuestionClick = () => handleAddQuestion(questions, answers, setQuestions, setAnswers);

  return (
    <div className="add-question-container">
      <h2 className="add-question-header">Add Questions</h2>
      {questions.map((question, questionIndex) => (
        <div key={question.id} className="question-container">
          <div className="question-input">
            <label className="question-label">Question {questionIndex + 1}:</label>
            <input 
              type="text" 
              value={question.question} 
              onChange={(e) => handleChangeQuestion(questions, setQuestions, questionIndex, e.target.value)} 
            />
          </div>
          <div className="options-input">
            <label className="options-label">Options:</label>
            {question.options.map((option, optionIndex) => (
              <input 
                key={optionIndex}
                type="text" 
                value={option} 
                onChange={(e) => handleChangeOption(questions, setQuestions, questionIndex, optionIndex, e.target.value)} 
              />
            ))}
          </div>
          <div className="correct-answer-input">
            <label className="correct-answer-label">Correct Answer:</label>
            <input 
              type="number" 
              value={answers[questionIndex] !== null ? answers[questionIndex] : ''} 
              onChange={(e) => handleChangeAnswer(answers, setAnswers, questionIndex, parseInt(e.target.value))} 
            />
          </div>
        </div>
      ))}
      <button className="add-question-button" onClick={handleAddQuestionClick}>Add Questions</button>
    </div>
  );
}

export default AddQuestionPage;

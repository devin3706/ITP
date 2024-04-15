// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateUser (){
    const [Name, setName] = useState("");
    const [StudentId, setStudentId] = useState("");
    const [Teacher, setTeacher] = useState("");
    const [Feedback, setFeedback] = useState("");
    const [Rating, setRating] = useState(0); // New state for rating
    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8081/users/CreateUser", { Name, StudentId, Teacher, Feedback, Rating })
        .then(result => {
            console.log(result)
            navigate('/users');

        })
        .catch(err => console.log(err))
    }

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    }

    // Function to render star rating UI
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleRatingChange(i)}
                >
                    {Rating >= i ? '★' : '☆'}
                </span>
            );
        }
        return stars;
    }

    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Submit}>
                    <h2> Create Feedback</h2>
                    <div className='mb-2'>
                        <label htmlFor="Name">Name : </label>
                        <input
                            type="text"
                            placeholder='Enter Name'
                            className='form-control'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="StuId">StudentId : </label>
                        <input
                            type="text"
                            placeholder='Enter Student Id'
                            className='form-control'
                            onChange={(e) => setStudentId(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="Teacher">Teacher : </label>
                        <input
                            type="text"
                            placeholder='Enter Teacher Name'
                            className='form-control'
                            onChange={(e) => setTeacher(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="Feedback">Feedback : </label>
                        <input
                            type="text"
                            placeholder='Enter Your Feedback'
                            className='form-control'
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label>Rating: </label>
                        {renderStars()}
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;
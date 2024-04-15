/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function UpdateUser (){
    const { id } = useParams();
    const [Name, setName] = useState("");
    const [StudentId, setStudentId] = useState("");
    const [Teacher, setTeacher] = useState("");
    const [Feedback, setFeedback] = useState("");
    const [Rating, setRating] = useState(0); // New state for rating
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/users/getUser/${id}`)
        .then(result => {
            console.log(result);
            setName(result.data.Name);
            setStudentId(result.data.StudentId);
            setTeacher(result.data.Teacher);
            setFeedback(result.data.Feedback);
            setRating(result.data.Rating); // Set the initial rating
        })
        .catch(err => console.log(err));
    }, [id]);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };
    const Update = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8081/users/updateUser/${id}`, { Name, StudentId, Teacher, Feedback, Rating })
        .then(result => {
            console.log(result);
            navigate('/users');
        })
        .catch(err => console.log(err));
    }

    // Function to render star rating UI
    const renderStars = (currentRating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleRatingChange(i)}
                >
                    {i <= Rating ? '★' : '☆'}
                </span>
            );
        }
        return stars;
    }

    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Update}>
                    <h2> Update Feedback</h2>
                    <div className='mb-2'>
                        <label htmlFor="">Name : </label>
                        <input
                            type="text"
                            placeholder='Enter Name'
                            className='form-control'
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">StudentId : </label>
                        <input
                            type="text"
                            placeholder='Enter Student Id'
                            className='form-control'
                            value={StudentId}
                            onChange={(e) => setStudentId(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Teacher : </label>
                        <input
                            type="text"
                            placeholder='Enter Teacher Name'
                            className='form-control'
                            value={Teacher}
                            onChange={(e) => setTeacher(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Feedback : </label>
                        <input
                            type="text"
                            placeholder='Enter Your Feedback'
                            className='form-control'
                            value={Feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label>Rating: </label>
                        {renderStars(Rating)}
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
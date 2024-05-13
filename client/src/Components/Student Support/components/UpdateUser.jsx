import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";

function UpdateUser() {
    const { id } = useParams();
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Teacher, setTeacher] = useState("");
    const [Feedback, setFeedback] = useState("");
    const [Rating, setRating] = useState(0);
    const navigate = useNavigate("/users");

    useEffect(() => {
        axios.get(`http://localhost:8081/users/${id}`)
            .then(result => {
                const userData = result.data;
                setName(userData.Name);
                setEmail(userData.Email);
                setTeacher(userData.Teacher);
                setFeedback(userData.Feedback);
                setRating(userData.Rating);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const Update = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8081/users/update/${id}`, { Name, Email, Teacher, Feedback, Rating })
            .then(result => {
                console.log(result);
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    const renderStars = (currentRating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleRatingChange(i)}
                >
                    {i <= currentRating ? '★' : '☆'}
                </span>
            );
        }
        return stars;
    }

    return (
        <div style={{ backgroundColor: '#ECF0F5'}}>
            <Header/>
            <div className='d-flex mt-10 mb-10 justify-content-center align-items-center'>
                <div className='w-50 bg-white shadow rounded p-3'>
                    <form onSubmit={Update}>
                        <h2>Update Feedback</h2>
                        <div className='mb-2'>
                            <label htmlFor="">Name:</label>
                            <input
                                type="text"
                                placeholder='Enter Name'
                                className='form-control'
                                value={Name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="">Email:</label>
                            <input
                                type="text"
                                placeholder='Enter Email'
                                className='form-control'
                                value={Email}
                                onChange={handleChangeEmail}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="">Teacher:</label>
                            <input
                                type="text"
                                placeholder='Enter Teacher Name'
                                className='form-control'
                                value={Teacher}
                                onChange={(e) => setTeacher(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="">Feedback:</label>
                            <input
                                type="text"
                                placeholder='Enter Your Feedback'
                                className='form-control'
                                value={Feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label>Rating:</label>
                            {renderStars(Rating)}
                        </div>
                        <button className='btn btn-primary'>Update</button>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default UpdateUser;
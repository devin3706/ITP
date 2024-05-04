import React from 'react';
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Header from '../../Exam Platform and Leaderboard/components/Header';
import Footer from '../../Exam Platform and Leaderboard/components/Footer';
import "../../../styles.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/forgotPassword', {email})
        .then(response => {
            if(response.data.status){
                alert("check your email for reset")
                    navigate('/login')
            }
     }) .catch(err => console.log(err))
    };

    return(
        <div style={{ backgroundColor: '#ECF0F5' }}>
            <Header/>
            <div className="container mt-10 mb-10">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="card shadow-lg p-4">
                            <form onSubmit={handleSubmit}>
                                <h4 className="text-center mb-4">Forgot Password</h4>

                                <div className="mb-3">
                                    <label htmlFor="email"><strong>Email</strong></label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter Email"
                                        autoComplete="off"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <button type="submit" className="btn btn-success w-100 rounded-0">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );

} 

export default ForgotPassword;
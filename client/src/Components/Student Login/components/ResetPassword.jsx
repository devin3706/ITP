import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Header from '../../Exam Platform and Leaderboard/components/Header';
import Footer from '../../Exam Platform and Leaderboard/components/Footer';
//import "../styles/App.css";

function ResetPassword() {
    
    const [password, setPassword] = useState()

    const navigate = useNavigate()

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8081/resetPassword', {password})
        .then(response => {
            if(response.data.status){
                    navigate('/login')
            }
     }) .catch(err => console.log(err))
    };

    return(
        <div style={{ backgroundColor: '#ECF0F5' }}>
            <Header />
            <div className="container mt-10 mb-10">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-lg p-4">
                            <form onSubmit={handleSubmit}>
                                <h4 className="text-center mb-4">Reset Password</h4>

                                <div className="mb-3">
                                    <label htmlFor="password"><strong>Password</strong></label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="******"
                                        autoComplete="off"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <button type="submit" className="btn btn-success w-100 rounded-0">Reset</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );

} 

export default ResetPassword;
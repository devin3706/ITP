import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";

function ReplyInquiry() {
    const [email, setEmail] = useState("");
    const [teacher, setTeacher] = useState("");
    const [classValue, setClass] = useState("");
    const [question, setQuestion] = useState(""); 
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8081/inquiry/create", { email, teacher, class: classValue, question })
        .then(result => {
            console.log(result);
            navigate('/inquiries');
        })
        .catch(err => console.log(err));
    }

    return (
        <div style={{ backgroundColor: '#ECF0F5'}}>
            <Header/>
            <div className='d-flex mt-10 mb-10 justify-content-center align-items-center'>
                <div className='w-50 bg-white shadow rounded-3 p-3'>
                    <form onSubmit={handleSubmit}>
                        <h2>Reply Question</h2>
                        
                        <div className='mb-2'>
                            <label htmlFor="question"></label>
                            <textarea
                                placeholder='Enter Your Question'
                                className='form-control'
                                rows='4'
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                        </div>
                        <button className='btn btn-success'>Submit</button>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default ReplyInquiry;

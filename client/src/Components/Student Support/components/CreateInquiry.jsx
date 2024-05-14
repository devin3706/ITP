import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";

function CreateInquiry (){
 
    const [Email, setEmail] = useState("");
    const [Teacher, setTeacher] = useState("");
    const [Class, setClass] = useState("");
    const [Question, setQuestion] = useState(""); 
    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8081/inquiry/create", { Email, Teacher, Class, Question})
        .then(result => {
            console.log(result);
            navigate('/inquiries');
        })
        .catch(err => console.log(err));
    }

    const handleTeacherChange = (e) => {
        const value = e.target.value;
        // Preventing numbers and special characters in the Teacher field
        if (!/^[a-zA-Z\s]*$/.test(value)) {
            // If the entered value contains numbers or special characters, don't update the state
            return;
        }
        // If the entered value is valid, update the state
        setTeacher(value);
    };

    return(
        <div style={{ backgroundColor: '#ECF0F5'}}>
            <Header/>
            <div className='d-flex mt-10 mb-10 justify-content-center align-items-center'>
                <div className='w-50 bg-white shadow rounded-3 p-3'>
                    <form onSubmit={Submit}>
                        <h2> Create Question</h2>
                        <div className='mb-2'>
                            <label htmlFor="Name">Email : </label>
                            <input
                                type="text"
                                placeholder='Enter Email'
                                className='form-control'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="Email">Teacher : </label>
                            <input
                                type="text"
                                placeholder='Enter Teacher Name'
                                className='form-control'
                                onChange={handleTeacherChange}
                                value={Teacher}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="Teacher">Class : </label>
                            <input
                                type="text"
                                placeholder='Enter Class'
                                className='form-control'
                                onChange={(e) => setClass(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="Feedback">Question : </label>
                            <textarea
                                placeholder='Enter Your Question'
                                className='form-control'
                                rows='4' // Adjust rows based on your preference
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

export default CreateInquiry;

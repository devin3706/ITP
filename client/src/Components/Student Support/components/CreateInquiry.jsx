import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    


    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
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
                            onChange={(e) => setTeacher(e.target.value)}
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
    );
}

export default CreateInquiry;
import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import "../styles/App.css";

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
        <div className = "sign-up-container">
        <form className =  "sign-up-form" onSubmit = {handleSubmit}>  
                <h4> Reset Password </h4>

                        <label htmlFor="password">
                            <strong> Password</strong>
                        </label>
                        <input
                        type = "password"
                        placeholder = "*****"
                        onChange = { (e) => setPassword(e.target.value)}/>
                   
                    
                  <button type ="submit" className = "btn btn-success w-100 rounded -0">
                    Reset 
                    </button>
                    </form> 
                    
                    
            </div>
       
    );

} 

export default ResetPassword;
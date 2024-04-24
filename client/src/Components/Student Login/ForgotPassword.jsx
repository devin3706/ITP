import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import "../../App.css";

function ForgotPassword() {
    
    const [email, setEmail] = useState()
    
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8081/forgotPassword', {email})
        .then(response => {
            
            if(response.data.status){
                alert("check your email for reset")
                    navigate('/studentLogin')
            }
     }) .catch(err => console.log(err))
    };

    return(
        <div className = "sign-up-container">
        <form className =  "sign-up-form" onSubmit = {handleSubmit}>  
                <h4> Forgot Password </h4>

                        <label htmlFor="email">
                            <strong> Email </strong>
                        </label>
                        <input
                        type = "email"
                        placeholder = "Enter Email"
                        autoComplete = "off"
                        onChange = { (e) => setEmail(e.target.value)}/>
                   
                    
                  <button type ="submit" className = "btn btn-success w-100 rounded -0">
                    Send 
                    </button>
                    </form> 
                    
                    
            </div>
       
    );

} 

export default ForgotPassword;
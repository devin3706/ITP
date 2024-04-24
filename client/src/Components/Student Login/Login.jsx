import React from 'react'
import '../../App.css'
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login() {
    
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8081/auth/login', {email, password})
        .then(response=> {
            if(response.data.status){
                navigate('/')
            }
            
        })
        .catch(err => console.log(err))
    }

    return(
        <div className='sign-up-container'>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <h2>Login</h2>
                       
                        <label htmlFor="email">
                            <strong> Email </strong>
                        </label>
                        <input
                        type = "email"
                        placeholder = "Enter Email"
                        autoComplete = "off"
                        onChange = { (e) => setEmail(e.target.value)}/>
                    
                    
                        <label htmlFor="email">
                            <strong> Password </strong>
                        </label>
                        <input
                        type = "password"
                        placeholder = "******"
                        autoComplete = "off"
                        onChange = { (e) => setPassword(e.target.value)}/>
                    
                    <center><button type='submit'> Login </button></center>
                    <p>
                        <Link to = "/forgotPassword">Forgot Password</Link>
                    </p>
                   
                    <p>
                        Don't have an account?
                        <Link to = "/signup">Sign Up</Link>
                    </p>
                    </form>
                

        </div>
    );

}

export default Login;
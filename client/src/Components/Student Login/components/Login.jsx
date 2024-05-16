import React from 'react'
//import '../styles/App.css'
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Header from '../../Exam Platform and Leaderboard/components/Header';
import Footer from '../../Exam Platform and Leaderboard/components/Footer';

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
                navigate('/dashboard')
            }
            
        })
        .catch(err => console.log(err))
    }

    return(
        <div style={{ backgroundColor: '#ECF0F5' }}>
            <Header />
            <div className="headerBtns">
            <Link to='/' className="btn btn-grey fs-6">Home</Link>
            </div>
            <div className='container mt-5 mb-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card shadow-lg p-4 rounded-3'>
                            <h2 className='text-center mb-4'>Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className='form-group'>
                                    <label htmlFor='email'><strong>Email</strong></label>
                                    <input
                                        type='email'
                                        className='form-control'
                                        id='email'
                                        placeholder='Enter Email'
                                        autoComplete='off'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='password'><strong>Password</strong></label>
                                    <input
                                        type='password'
                                        className='form-control'
                                        id='password'
                                        placeholder='******'
                                        autoComplete='off'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className='text-center'>
                                    <button type='submit' className='btn btn-primary mt-3'>Login</button>
                                </div>
                                <p className='mt-3 text-center'>
                                    <Link to='/forgotPass'>Forgot Password</Link>
                                </p>
                                <p className='text-center'>
                                    Don't have an account? <Link to='/signup'>Sign Up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );

}

export default Login;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/auth/login', { email, password })
            .then(response => {
                if (response.data.status) {
                    navigate('/dashboard');
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <form style={{ width: '350px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }} onSubmit={handleSubmit}>
                <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Login</h2>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
                <input
                    type="email"
                    placeholder="Enter Email"
                    autoComplete="off"
                    style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '3px' }}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password</label>
                <input
                    type="password"
                    placeholder=""
                    autoComplete="off"
                    style={{ width: '100%', padding: '8px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '3px' }}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <center><Link to="/dashboard" type='submit' style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Login</Link></center>
                <p style={{ marginTop: '15px', textAlign: 'center' }}>
                    <Link to="/forgotPassword" style={{ color: '#007bff', textDecoration: 'none' }}>Forgot Password</Link>
                </p>
                <p style={{ textAlign: 'center' }}>
                    Don't have an account? <Link to="/signup" style={{ color: '#007bff', textDecoration: 'none' }}>Sign Up</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
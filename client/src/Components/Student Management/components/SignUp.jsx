import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [school, setSchool] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8081/register', {name, email, password, school, number, address})
        .then(result => {
            //console.log('Student signed up successfully', response.data);
            console.log(result)
            navigate('/login');
        })
        
        .catch(error => {
            console.error('Error signing up student:', error);
    });
    };
    return(
        <div className = "d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className = "bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit = {Submit}>
                    <div className = "mb-3">
                        <label htmlFor="name">
                            <strong> Name </strong>
                        </label>
                        <input
                        type = "text"
                        placeholder = "Enter Name"
                        autoComplete = "off"
                        name ="name"
                        value={name}
                        className = "form-control rounded-0"
                        onChange = { (e) => setName(e.target.value)}
                       />
                       </div>
                       <div className = "mb-3">
                        <label htmlFor="email">
                            <strong> Email </strong>
                        </label>
                        <input
                        type = "email"
                        placeholder = "Enter Email"
                        autoComplete = "off"
                        name ="email"
                        value={email}
                        className = "form-control rounded-0"
                        onChange = { (e) => setEmail(e.target.value)}/>
                    </div>
                    <div className = "mb-3">
                        <label htmlFor="email">
                            <strong> Password </strong>
                        </label>
                        <input
                        type = "password"
                        placeholder = "Enter Password"
                        autoComplete = "off"
                        name ="password"
                        value={password}
                        className = "form-control rounded-0"
                        onChange = { (e) => setPassword(e.target.value)}/>
                    </div>
                    <div className = "mb-3">
                        <label htmlFor="school">
                            <strong> School </strong>
                        </label>
                        <input
                        type = "text"
                        placeholder = "Enter Your School"
                        autoComplete = "off"
                        name ="school"
                        value={school}
                        className = "form-control rounded-0"
                        onChange = { (e) => setSchool(e.target.value)}/>
                    </div>
                    <div className = "mb-3">
                        <label htmlFor="number">
                            <strong> Contact Number </strong>
                        </label>
                        <input
                        type = "number"
                        placeholder = "Enter Contact Number"
                        autoComplete = "off"
                        name ="number"
                        value={number}
                        className = "form-control rounded-0"
                        onChange = { (e) => setNumber(e.target.value)}
                       />
                       </div>
                       <div className = "mb-3">
                        <label htmlFor="address">
                            <strong> Address </strong>
                        </label>
                        <input
                        type = "text"
                        placeholder = "Enter Address"
                        autoComplete = "off"
                        name ="address"
                        value={address}
                        className = "form-control rounded-0"
                        onChange = { (e) => setAddress(e.target.value)}
                       />
                       </div>
                       <Link to = "/login" className = "btn btn-success w-100 rounded-0">
                        Sign Up
                    </Link>
                    </form> 
                    <p> Already have an account</p>
                    <Link to = "/login" className = "btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                        Login
                    </Link>
                    <Link to = "/dashboard" className = "btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                        Go to Dashboard
                    </Link>
                    
                
            </div>
        </div>
    );

}

export default SignUp;



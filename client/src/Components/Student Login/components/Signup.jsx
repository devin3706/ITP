import React, { useState } from "react";
import '../styles/App.css'
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css'

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [school, setSchool] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8081/auth/signup', {
            name,
            email,
            password,
            school,
            number,
            address
        })
            .then(response => {
                if(response.data.status){
                    navigate('/login');

                }
            })
            .catch(err => {
                console.log(err)
            });
    };

    return (
        
        <div className='sign-up-container'>
            <form className='sign-up-form' onSubmit={handleSubmit}>

                <h2>Sign Up</h2>
                <label htmlFor="name">
                    <strong> Name </strong>
                </label>
                <input
                    type="text"
                    placeholder="Enter Name"
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="email">
                    <strong> Email </strong>
                </label>
                <input
                    type="email"
                    placeholder="Enter Email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">
                    <strong> Password </strong>
                </label>
                <input
                    type="password"
                    placeholder="*******"
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="school">
                    <strong> School </strong>
                </label>
                <input
                    type="text"
                    placeholder="Enter Your School"
                    autoComplete="off"
                    onChange={(e) => setSchool(e.target.value)}
                />
                <label htmlFor="number">
                    <strong> Contact Number </strong>
                </label>
                <input
                    type="number"
                    placeholder="Enter Contact Number"
                    autoComplete="off"
                    onChange={(e) => setNumber(e.target.value)}
                />
                <label htmlFor="address">
                    <strong> Address </strong>
                </label>
                <input
                    type="text"
                    placeholder="Enter Address"
                    autoComplete="off"
                    onChange={(e) => setAddress(e.target.value)}
                />

                <button type='submit'>Sign Up</button>

                <p>
                     Have an account? <Link to = "/login"> Login</Link>
                </p>
                
            </form>
        </div>
        


    )
}
export default Signup;



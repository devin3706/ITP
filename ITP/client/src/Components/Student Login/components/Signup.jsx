import React, { useState } from "react";
//import '../styles/App.css'
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";
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
        <div style={{ backgroundColor: '#ECF0F5' }}>
            <Header />
            <div className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-lg p-4 rounded-3">
                            <form onSubmit={handleSubmit}>
                                <h2 className="text-center mb-4">Sign Up</h2>

                                <div className="mb-3">
                                    <label htmlFor="name"><strong>Name</strong></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Enter Name"
                                        autoComplete="off"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email"><strong>Email</strong></label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter Email"
                                        autoComplete="off"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password"><strong>Password</strong></label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="*******"
                                        autoComplete="off"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="school"><strong>School</strong></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="school"
                                        placeholder="Enter Your School"
                                        autoComplete="off"
                                        value={school}
                                        onChange={(e) => setSchool(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="number"><strong>Contact Number</strong></label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="number"
                                        placeholder="Enter Contact Number"
                                        autoComplete="off"
                                        value={number}
                                        onChange={(e) => setNumber(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="address"><strong>Address</strong></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        placeholder="Enter Address"
                                        autoComplete="off"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary w-100">Sign Up</button>

                                <p className="mt-3 text-center">
                                    Have an account? <Link to="/login">Login</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}
export default Signup;



import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {useState, useEffect } from "react";
import axios from 'axios';
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";

function UpdateProfile () {
    const {id} = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [school, setSchool] = useState('');
    const [number, setNumber] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/auth/getProfile/${id}`)
        .then(result => {
            const profileData = result.data;
                setName(profileData.name || '');
                setEmail(profileData.email || '');
                setSchool(profileData.school || '');
                setNumber(profileData.number || '');
                setAddress(profileData.address || '');
        })
        .catch(err => console.log(err));
    },[id]);

    const Update = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8081/auth/updateProfile/${id}`, { 
            name,
            email,
            school,
            number,
            address
        })
        .then(result => {
            console.log(result);
            navigate('/profile');
        }) 
        .catch(err => console.log(err));
    }
    
    return (
        <div style={{ backgroundColor: '#ECF0F5' }}>
            <Header/>
            <div className="d-flex vh-100 justify-content-center align-items-center">
                <div className = "bg-white p-3 rounded-3 w-50">
                    <h2 className="text-center">Update Details</h2>
                    <form onSubmit = {Update}>
                        <div className = "mb-2">
                            <label htmlFor="email">
                                <strong> Name </strong>
                            </label>
                            <input
                                type = "text" placeholder = "Enter Name"
                                className = "form-control "
                                value = {name}
                                onChange = { (e) => setName(e.target.value)}
                            />
                        </div>
                        <div className = "mb-2">
                            <label htmlFor="email">
                                <strong> Email </strong>
                            </label>
                            <input
                                type = "email"
                                placeholder = "Enter Email"
                                className = "form-control "
                                value ={email}
                                onChange = { (e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className = "mb-2">
                            <label htmlFor="email">
                                <strong> School </strong>
                            </label>
                            <input
                                type = "text"
                                placeholder = "Enter School"
                                className = "form-control "
                                value = {school}
                                onChange = { (e) => setSchool(e.target.value)}
                            />
                        </div>
                        <div className = "mb-2">
                            <label htmlFor="email">
                                <strong> Contact Number</strong>
                            </label>
                            <input
                                type = "number"
                                placeholder = "Enter Contact Number"
                                className = "form-control "
                                value = {number}
                                onChange = { (e) => setNumber(e.target.value)}
                            />
                        </div>
                        <div className = "mb-2">
                            <label htmlFor="email">
                                <strong> Address</strong>
                            </label>
                            <input
                                type = "text"
                                placeholder = "Enter Address"
                                className = "form-control"
                                value = {address}
                                onChange = { (e) => setAddress(e.target.value)}
                            />
                        </div>
                        <button type = "submit" className = "btn btn-success w-100 rounded-0">
                            Update
                        </button>
                    </form>                    
                </div>
            </div>
            <Footer/>
        </div>
    );
} ;

export default UpdateProfile;
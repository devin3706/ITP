import React, { useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom";
import Header from "../../Exam Platform and Leaderboard/components/Header";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";

function CreateUser () {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [school, setSchool] = useState("")
    const [number, setNumber] = useState("")
    const [address, setAddress] = useState("")
    const navigate = useNavigate()

    const Submit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/student/createUser', {name, email, school, number, address})
        .then(result => {
            console.log(result);
            navigate('/dashboard');
    }) 
        .catch(err => console.log(err))
    }

    return (
        <div className = "d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: "#ECF0F5" }}>
        <Header/>
        <div className = "bg-white p-3 rounded w-50 shadow">
            <h2 className="text-center">Add User</h2>
            <form onSubmit={Submit}>
                <div className = "mb-2">
                    <label htmlFor="">
                        <strong> Name </strong>
                    </label>
                    <input
                    type = "text" placeholder = "Enter Name"
                    //autoComplete = "off"
                   // name ="email"
                    className = "form-control "
                    onChange = { (e) => setName(e.target.value)}
                   />
                   </div>
                   <div className = "mb-2">
                    <label htmlFor="">
                        <strong> Email </strong>
                    </label>
                    <input
                    type = "email"
                    placeholder = "Enter Email"
                    //autoComplete = "off"
                    //name ="email"
                    className = "form-control "
                    onChange = { (e) => setEmail(e.target.value)}
                    />
                </div>
                <div className = "mb-2">
                    <label htmlFor="">
                        <strong> School </strong>
                    </label>
                    <input
                    type = "text"
                    placeholder = "Enter School"
                    //autoComplete = "off"
                    //name ="password"
                    className = "form-control "
                    onChange = { (e) => setSchool(e.target.value)}
                    />
                </div>
                <div className = "mb-2">
                    <label htmlFor="">
                        <strong> Contact Number</strong>
                    </label>
                    <input
                    type = "number"
                    placeholder = "Enter Contact Number"
                    
                    //autoComplete = "off"
                    //name ="password"
                    className = "form-control "
                    onChange = { (e) => setNumber(e.target.value)}
                    />
                    <div className = "mb-2">
                    <label htmlFor="">
                        <strong> Address</strong>
                    </label>
                    <input
                    type = "text"
                    placeholder = "Enter Address"
                    //autoComplete = "off"
                    //name ="password"
                    className = "form-control "
                    onChange = { (e) => setAddress(e.target.value)}
                    />
                </div>
                </div>
                <button type = "submit" className = "btn btn-success w-100 rounded-0">
                   Submit
                </button>
                </form> 
        </div>
        <Footer/>
    </div>
    );
} 

export default CreateUser;
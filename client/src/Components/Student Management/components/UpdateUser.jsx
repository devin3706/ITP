import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {useState, useEffect } from "react";
import axios from 'axios';
import Header from "../../Exam Platform and Leaderboard/components/Header";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";

function UpdateUser () {
    const {id} = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [school, setSchool] = useState('');
    const [number, setNumber] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/student/getUser/${id}`)
        .then(result => {
            
            //setName(result.data.name);
            //setEmail(result.data.email);
            //setSchool(result.data.school);
            //setNumber(result.data.number);
            //setAddress(result.data.address);
            const userData = result.data;
                setName(userData.name || '');
                setEmail(userData.email || '');
                setSchool(userData.school || '');
                setNumber(userData.number || '');
                setAddress(userData.address || '');
        })
        .catch(err => console.log(err));
    },[id]);

    const Update = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8081/student/updateUser/${id}`, { 
            name,
            email,
            school,
            number,
            address
        })
        .then(result => {
            console.log(result);
            navigate('/students');
        }) 
        .catch(err => console.log(err));
    }
    
    return (
        <div style={{backgroundColor: '#ECF0F5'}}>
            <Header/>
        <div className="d-flex mt-5 mb-5 vh-100 justify-content-center align-items-center">
        <div className = "bg-white p-3 rounded-3 w-50">
            <h2>Update User</h2>
            <form onSubmit = {Update}>
                <div className = "mb-2">
                    <label htmlFor="email">
                        <strong> Name </strong>
                    </label>
                    <input
                    type = "text" placeholder = "Enter Name"
                    //autoComplete = "off"
                   // name ="email"
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
                    //autoComplete = "off"
                    //name ="email"
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
                    //autoComplete = "off"
                    //name ="password"
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
                    
                    //autoComplete = "off"
                    //name ="password"
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
                    //autoComplete = "off"
                    //name ="password"
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

export default UpdateUser;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//design
import { Button } from "@mui/material";

//api functions
import { register } from "../api/admin";

//header and footer
import Header from "../../Exam Platform and Leaderboard/components/Header";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";

const AdminCreate = () => {
    const navigate = useNavigate();

    //form states
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    //const [province, setProvince] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");


    //validations
    let hasSixChar = password.length >= 6;
    let isContact = contact >= 700000000 && contact <= 799999999 && contact.toString().length === 9;
    let isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    

    const handleAdminCreate = async (e) => {
        e.preventDefault();

        try{
            const res = await register({ fName, lName, username, email, contact, password });
            if (res.error) alert(res.error);
            else{
                alert(res.message);
                navigate("/adminDetails");
            }
        
        }catch(err){
            alert(err);

        }
    }

    return(
        <div style={{backgroundColor: '#ECF0F5'}} className="vh-100">
        <Header/>
            <div className="justify-content-md-center">
                <div className="text-center mt-5 alert alert-dark col-5 border border-dark shadow" style={{marginLeft: '30%'}}>
                    <label htmlFor="" className="h2">Create New Admin</label>
                </div>

                <div className="alert alert-secondary col-5 border border-dark shadow mb-5" style={{marginLeft: '30%'}}>
                    <div className="form-group">

                        <div className="input-group align-items-center">
                            <span className="input-group-text text-bg-secondary border border-dark">Name</span>
                            <input 
                                type="text" 
                                aria-label="First name" 
                                className="form-control border border-dark" 
                                id="fName" 
                                placeholder="First Name" 
                                value={fName}
                                onChange={(e) => {
                                    const input = e.target.value;
                                    // Regular expression to match only letters (both uppercase and lowercase)
                                    const regex = /^[a-zA-Z]*$/;
                                    // Check if the input matches the regex, if so update the state
                                    if (regex.test(input) || input === '') {
                                        setFName(input);
                                    }
                                }}
                            />

                            <input type="text" aria-label="Last name" className="form-control border border-dark" id="lName" placeholder="Last Name" value={lName}
                                onChange={(e) => setLName(e.target.value)}/>
                        </div>

                        <div className="input-group mt-3">
                            <span className="input-group-text text-bg-secondary border border-dark" id="username">Username</span>
                            <input type="text" className="form-control border border-dark" placeholder="username" aria-label="username" aria-describedby="basic-addon1" value={username}
                                onChange={(e) => setUsername(e.target.value)}/>
                        </div>

                        <div className="input-group mt-3">
                            <span className="input-group-text text-bg-secondary border border-dark" id="email">Email</span>
                            <input type="email" className="form-control border border-dark" placeholder="name@example.com" aria-label="email" aria-describedby="basic-addon1" value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="ml-1">
                            <small className={isEmail ? 'text-success' : 'text-danger'}>Email should be a valid email</small>
                        </div>

                        {/* <div className="input-group mt-3">
                            <label className="input-group-text text-bg-secondary p-2" for="province">Location - Province</label>
                            <select className="form-select" id="province" value={province} onChange={(e) => setProvince(e.target.value)}>
                                <option value="0">Select Location</option>
                                <option value="1">Western</option>
                                <option value="2">Southern</option>
                                <option value="3">Central</option>
                                <option value="4">Eastern</option>
                            </select>
                        </div> */}

                        <div className="input-group mt-3">
                            <span className="input-group-text text-bg-secondary border border-dark" id="email">Contact Number</span>
                            <span className="input-group-text text-bg-secondary border border-dark" id="email">+94</span>
                            <input type="number" className="form-control border border-dark" id="contact" placeholder="7xxxxxxxx" aria-label="contact" aria-describedby="basic-addon1" value={contact}
                                onChange={(e) => setContact(e.target.value)}/>
                        </div>
                        <div className="ml-1">
                            <small className={isContact ? 'text-success' : 'text-danger'}>Number should start with 7 and should contain 9 digits</small>
                        </div>

                        <div className="input-group mt-3">
                            <span className="input-group-text text-bg-secondary border border-dark">Password</span>
                            <input 
                                type="password" 
                                id="password" 
                                className="form-control border border-dark"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            
                            <input 
                                type="password" 
                                id="confPassword" 
                                className="form-control border border-dark"
                                placeholder="Confirm Password"
                                value={confPassword}
                                onChange={(e) => setConfPassword(e.target.value)}
                            />
                        </div>
                        <div className="ml-1">
                            <small className={hasSixChar ? 'text-success' : 'text-danger'}>at least 6 characters</small>
                        </div>

                    </div>
                    
                    <div className="text-center mt-4">
                        <Button 
                            variant="contained" 
                            disabled={
                                !(password === confPassword)
                                || !password
                                || !hasSixChar
                                || !confPassword
                                || !username
                                || !isEmail
                                || !fName
                                || !lName
                                || !isContact
                            }
                            onClick={handleAdminCreate}
                        >
                            Create Admin
                        </Button>
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    ); 
};

export default AdminCreate;
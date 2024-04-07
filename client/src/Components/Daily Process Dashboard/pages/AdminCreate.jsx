import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//design
import { Button } from "@mui/material";

//api functions
import { register } from "../api/admin";

import AdminHeader from '../components/AdminHeader'

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


    //password validations
    let hasSixChar = password.length >= 6;

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
        <div>
        <AdminHeader />
            <div className="container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-5">
                <div className="text-center mb-5 alert alert-dark">
                    <label htmlFor="" className="h2">Create New Admin</label>
                </div>

                <div className="alert alert-primary">
                    <div className="form-group">

                        <div className="input-group">
                            <span className="input-group-text text-bg-secondary p-2">Name</span>
                            <input type="text" aria-label="First name" className="form-control" id="fName" placeholder="First Name" value={fName}
                                onChange={(e) => setFName(e.target.value)}/>
                            <input type="text" aria-label="Last name" className="form-control" id="lName" placeholder="Last Name" value={lName}
                                onChange={(e) => setLName(e.target.value)}/>
                        </div>

                        <div className="input-group mt-3">
                            <span className="input-group-text text-bg-secondary p-2" id="username">Username</span>
                            <input type="text" className="form-control" placeholder="username" aria-label="username" aria-describedby="basic-addon1" value={username}
                                onChange={(e) => setUsername(e.target.value)}/>
                        </div>

                        <div className="input-group mt-3">
                            <span className="input-group-text text-bg-secondary p-2" id="email">Email</span>
                            <input type="email" className="form-control" placeholder="name@example.com" aria-label="email" aria-describedby="basic-addon1" value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
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
                            <span className="input-group-text text-bg-secondary p-2" id="email">Contact Number</span>
                            <span className="input-group-text text-bg-secondary p-2" id="email">+94</span>
                            <input type="number" className="form-control" id="contact" placeholder="7xxxxxxxx" aria-label="contact" aria-describedby="basic-addon1" value={contact}
                                onChange={(e) => setContact(e.target.value)}/>
                        </div>

                        <div className="input-group mt-3">
                            <span className="input-group-text text-bg-secondary p-2">Password</span>
                            <input 
                                type="password" 
                                id="password" 
                                className="form-control"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            
                            <input 
                                type="password" 
                                id="confPassword" 
                                className="form-control"
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
                                || !contact
                                || !username
                                || !email
                                || !fName
                                || !lName
                                || !(contact >= 700000000)
                                || !(contact <= 799999999)
                                || !(contact.toString().length === 9)
                            }
                            onClick={handleAdminCreate}
                        >
                            Create Admin
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    ); 
};

export default AdminCreate;
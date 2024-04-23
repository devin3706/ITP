import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox  
} from 'mdb-react-ui-kit';
import Header from "../../Exam Platform and Leaderboard/components/Header";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";

const TLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate email and password (you can add more validation if needed)
        if (!email || !password) {
            alert("Please enter both email and password");
            return;
        }
    
        try {
            // Make an HTTP request to your backend server to authenticate the user
            const response = await axios.post("http://localhost:8081/teacher/login", { email, password });
            
            // Handle successful authentication (e.g., redirect to dashboard)
            console.log("User authenticated:", response.data);
            alert("Login Success.");
           
            navigate('/tHome'); // Redirect to the dashboard page
        } catch (error) {
            // Handle authentication error (e.g., display error message)
            console.error("Authentication failed:", error);
            alert("Authentication failed. Please check your email and password.");
        }
    };

    const handleForgotPassword = () => {
        // Navigate to the forgot password page
        navigate('/tEnterEmail');
    };
    

    return (
        <div style={{ backgroundColor: '#ECF0F5' }}>
        <Header/>
        <MDBContainer fluid className="p-3 my-5">
            <MDBRow>
                <MDBCol col='10' md='6'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
                </MDBCol>
                <MDBCol col='4' md='6'>
                    <form onSubmit={handleSubmit}>
                        <MDBInput wrapperClass='mb-4' label='Email address' id='logName' type='email' value={email} onChange={handleChangeEmail} />
                        <MDBInput wrapperClass='mb-4' label='Password' id='logPassword' type='password' value={password} onChange={handleChangePassword} />
                        <div className="d-flex justify-content-between mx-4 mb-4">
                            <a href="#" onClick={handleForgotPassword}>Forgot password?</a>
                        </div>
                        <div class="col-12">
                            <button class="btn btn-primary mb-4 w-100" size="lg" id='logSubmit' type="submit" >Sign in</button>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
        <Footer/>
        </div>
    );
};

export default TLogin;

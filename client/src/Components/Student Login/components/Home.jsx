import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//import '../styles/App.css';

function Home() {
    const [studentData, setStudentData] = useState([]);
    const [loading, setLoading] = useState(true);

    return (
        <div>
            <h1>First home page</h1>
            
            <div className="signup-login">
         <button className="signup-button"><Link to = "/signup">Sign Up</Link></button>
         <br/><br/>
           <button className="login-button"><Link to = "/login">Login</Link></button>
        </div>
            


    
        </div>
    );
}

export default Home;
/*

import { useContext, useEffect } from "react";
import React from "react";
//import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
//import Button from 'react-bootstrap/Button';
//import Stack from 'react-bootstrap/Stack';

const Home = () =>{
    //const[student, setStudent] = useState();
    const navigate = useNavigate();
    //const {user} = useContext(AuthContext)
    useEffect(()=>{
        !user && navigate("/login", {replace:true });

    },[]);
    const handleSignup = () => {
        navigate("/signup"); // Navigate to the CreateFinancial page
    }

    const handleLogin = () => {
        navigate("/login"); // Navigate to the CreateFinancial page
    }
    const handleProfile = () => {
        navigate("/profile"); // Navigate to the All Payments page
    }


    return (
        
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%', // Adjust the height as needed
            backgroundColor: 'white', // Semi-transparent cinnamon brown
            zIndex: -1,
        }}>
        
        <div style={{ textAlign: 'center', fontSize: '50px',fontWeight: 'bold',  marginTop: '80px',color: 'black' }}>
             
            Welcome {student ? student.name : null}...!
            </div>
                <div style={{ textAlign: 'left', marginRight: '500px' }}>
                    <button onClick={signup} style={{ border: '3px solid black', background: '#7B3F00', margin: '20px', padding: '5px', cursor: 'pointer' }}>
                        <img src="src/assets/1.png" alt="Sign Up" style={{ width: '150px', height: '150px' }} />
                    </button>
                   <button style={{ 
    cursor: 'pointer', 
    fontSize: '25px', 
    backgroundColor: 'rgba(123, 63, 0, 0.5)', // Cinnamon brown color with opacity
    border: '3px solid #7b3f00',
    borderRadius: '10px', // Rounded corners
    padding: '10px 20px', // Padding for better appearance
    color: 'white' // Text color
}} onClick={signup}>Signup</button>
                </div>  
                <div style={{ textAlign: 'left', marginRight: '500px' }}>
                    <button onClick={login} style={{ border: '3px solid black', background: '#7B3F00', margin: '20px', padding: '5px', cursor: 'pointer' }}>
                        <img src="src/assets/2.png" alt="Login" style={{ width: '150px', height: '150px' }} />
                    </button>
                    <button style={{ 
    cursor: 'pointer', 
    fontSize: '25px', 
    backgroundColor: 'rgba(123, 63, 0, 0.5)', // Cinnamon brown color with opacity
    border:'3px solid #7b3f00', // Remove border
    borderRadius: '10px', // Rounded corners
    padding: '10px 20px', // Padding for better appearance
    color: 'white' // Text color
}} onClick={login}>Login</button>
                </div>
                <div style={{ textAlign: 'left', marginRight: '500px' }}>
                    <button onClick={profile} style={{ border: '3px solid black', background: '#7B3F00', margin: '20px', padding: '5px', cursor: 'pointer' }}>
                        <img src="src/assets/3.png" alt="Profile" style={{ width: '150px', height: '150px' }} />
                    </button>
                    <button style={{ 
    cursor: 'pointer', 
    fontSize: '25px', 
    backgroundColor: 'rgba(123, 63, 0, 0.5)', // Cinnamon brown color with opacity
    border: '3px solid #7b3f00', // Remove border
    borderRadius: '10px', // Rounded corners
    padding: '10px 20px', // Padding for better appearance
    color: 'white' // Text color
}} onClick={profile}> Profile</button>
                </div>
           
                
            </div>
    );
  
      }


export default Home;*/

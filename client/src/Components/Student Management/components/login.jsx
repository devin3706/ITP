// import React from 'react'
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from 'axios'
// import { useNavigate } from "react-router-dom";

// function login() {
    
//     const [email, setEmail] = useState()
//     const [password, setPassword] = useState()
//     const navigate = useNavigate()

//     axios.defaults.withCredentials = true;

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         axios.post('http://localhost:8081/login', {email, password})
//         .then(result => {
//             console.log("login: " + result.data);
//             if(res.data.Status === "Success"){
//                 if(res.data.role === "admin"){
//                     navigate('/dashboard')
//                 }else{
//                     navigate('/')
//                 }
                
//             }
//         })
//         .catch(err => console.log(err))
//     }

//     return(
//         <div className = "d-flex justify-content-center align-items-center bg-secondary vh-100">
//             <div className = "bg-white p-3 rounded w-25">
//                 <h2>Login</h2>
//                 <form onSubmit = {handleSubmit}>
//                        <div className = "mb-3">
//                         <label htmlFor="email">
//                             <strong> Email </strong>
//                         </label>
//                         <input
//                         type = "email"
//                         placeholder = "Enter Email"
//                         autoComplete = "off"
//                         name ="email"
//                         className = "form-control rounded-0"
//                         onChange = { (e) => setEmail(e.target.value)}/>
//                     </div>
//                     <div className = "mb-3">
//                         <label htmlFor="email">
//                             <strong> Password </strong>
//                         </label>
//                         <input
//                         type = "password"
//                         placeholder = "Enter Password"
//                         autoComplete = "off"
//                         name ="password"
//                         className = "form-control rounded-0"
//                         onChange = { (e) => setPassword(e.target.value)}/>
//                     </div>
                  
//                     </form> 
                   
//                     <p>
//                         <Link to = "/forgot-password">Forgot Password</Link>
//                     </p>
//                     <br/><br/>
//                     <Link to = "/profile" className = "btn btn-success w-100 rounded-0">
//                         Login
//                     </Link>
                
//             </div>
//         </div>
//     );

// }

// export default login;
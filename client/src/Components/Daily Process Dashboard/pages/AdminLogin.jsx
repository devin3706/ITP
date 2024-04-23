import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AdminContext } from "../../../AdminContext";

//design
import { Button } from "@mui/material";

//api functions
import { login } from "../api/admin";

import AdminHeader from '../components/AdminHeader'

const AdminLogin = () => {
    const navigate = useNavigate();
    const { setAdmin } = useContext(AdminContext)

    //form states
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleAdminLogin = async(e) => {
        e.preventDefault();

        try{
            const res = await login({ username, email, password });
            if(res.error) alert(res.error);
            else{
                alert(res.message);
                setAdmin(res.username);
                
                navigate("/adminHome");
            }

        }catch(err){
            alert(err);

        }
    }

    return(
        <div style={{backgroundColor: '#ECF0F5'}} className="vh-100">
        <AdminHeader />
            <div className="justify-content-md-center">
                <div className="text-center mt-5 alert alert-dark col-5 border border-dark shadow" style={{marginLeft: '30%'}}>
                    <label htmlFor="" className="h2">Admin Login</label>
                </div>

                <div className="alert alert-primary col-5 border border-dark shadow" style={{marginLeft: '30%'}}>
                    <div className="form-group">
                        <div className="mb-3">
                            <label for="email" className="form-label">Email</label>
                            <input 
                                type="email" 
                                className="form-control border border-dark" 
                                id="email" 
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="mb-3">
                            <label for="username" className="form-label">Username</label>
                            <input 
                                type="text" 
                                className="form-control border border-dark" 
                                id="username" 
                                placeholder="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label for="password" className="form-label">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="form-control border border-dark" 
                            aria-describedby="passwordHelpBlock"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        
                    </div>

                    <div className="text-center mt-4">
                        <Button 
                            variant="contained" 
                            disabled={!email || !username || !password}
                            onClick={handleAdminLogin}                    
                        >
                            Login
                        </Button>

                    </div>
                </div>

            </div>
        </div>
    ); 
};

export default AdminLogin;
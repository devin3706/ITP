import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {useState, useEffect } from "react";
import axios from 'axios';
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";

function UpdateBSMarks() {
    const {id} = useParams();
    const [bsmarks, setBSMarks] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/marks/getBSMarks/${id}`)
        .then(result => {
          
            const userData = result.data;
                setBSMarks(userData.bsmarks || '');
        })
        .catch(err => console.log(err));
    },[id]);

    const Update = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8081/marks/updateBSMarks/${id}`, { 
            bsmarks
        })
        .then(result => {
            console.log(result);
            navigate('/bsmarks');
        }) 
        .catch(err => console.log(err));
    }
    
    return (
        <div style={{backgroundColor: '#ECF0F5'}}>
            <Header/>
        <div className="d-flex vh-100 justify-content-center align-items-center">
        <div className = "bg-white p-3 rounded-3 w-50 shadow">
            <h2>Update User</h2>
            <form onSubmit = {UpdateBSMarks}>
                <div className = "mb-2">
                    <label htmlFor="email">
                        <strong> Marks </strong>
                    </label>
                    <input
                    type = "number" placeholder = "Enter Marks"
                    //autoComplete = "off"
                   // name ="email"
                    className = "form-control "
                    value = {bsmarks}
                    onChange = { (e) => setBSMarks(e.target.value)}
                   />
                   </div>
                <button type = "submit" className = "btn btn-success w-100 rounded-0">
                  Upload
                </button>
                </form> 
               
            
        </div>
    </div>
    <Footer/>
    </div>
    );
} ;

export default UpdateBSMarks;
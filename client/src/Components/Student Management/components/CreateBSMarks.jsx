import React, { useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function CreateBSMarks() {
    const [bsmarks, setBSMarks] = useState(0);
    const navigate = useNavigate()

    const Submit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/marks/createBSMarks', {bsmarks})
        .then(result => {
            console.log(result);
            navigate('/bsmarks');
    }) 
        .catch(err => console.log(err));
    };

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: '#005F69' }}>
        <div className = "bg-white p-3 rounded w-50">
            <h2>Upload Marks</h2>
            <form onSubmit={Submit}>
                <div className = "mb-2">
                    <label htmlFor="">
                        <strong> Business Studies Marks </strong>
                    </label>
                    <input
                    type = "number" placeholder = "Enter Marks"
                    //autoComplete = "off"
                   // name ="email"
                    className = "form-control "
                    onChange = { (e) => setBSMarks(e.target.value)}
                   />
                   </div>
                   
                
                <button type = "submit" className = "btn btn-success w-100 rounded-0">
                   Submit
                </button>
                </form> 
               
            
        </div>
    </div>
    );
} 

export default CreateBSMarks;
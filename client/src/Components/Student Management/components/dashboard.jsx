import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";


function Dashboard() {
    const [studentData, setStudentData] = useState([]);
    const [loading, setLoading] = useState(true);

    return (
        <div>
            <h1>Student Dashboard</h1>
            
            <Link to ="/students" className = 'btn btn-success'> Go to student list </Link>
            <br/><br/>
            


    
        </div>
    );
}

export default Dashboard;

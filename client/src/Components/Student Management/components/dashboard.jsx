import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Header from "../../Exam Platform and Leaderboard/components/Header";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";


function Dashboard() {
    const [studentData, setStudentData] = useState([]);
    const [loading, setLoading] = useState(true);

    return (
        <div className = "vh-100" style={{ backgroundColor: "#ECF0F5" }}>
            <Header/>
            <div className = "mt-5 mb-5">
            <h1 className="text-center">Student Dashboard</h1>

            <div className="row justify-content-md-center mt-5">
                <Link to ="/students" className = 'btn btn-success col-2'> Go to student list </Link>
            </div>

            </div>
            <Footer/>
    
        </div>
    );
}

export default Dashboard;

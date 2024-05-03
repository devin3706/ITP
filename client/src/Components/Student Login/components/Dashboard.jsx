

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';
//import { FaUserCircle } from 'react-icons/fa'; // Import profile icon from react-icons library


function Dashboard() {
  return (
    
    <div className="student-home-container">
      
      
      <div className="button-container">
      <div className="header">
        <button className="profile-button"><Link to = "/profile">Profile</Link></button>
        
        </div>
        
        <button className="large-button">Study Materials</button>
        <button className="large-button">Past Papers</button>
        <button className="large-button">Exam Platform</button>
        <button className="large-button">Results</button>
        <button className="large-button">Payment</button>
        <button className="large-button">Feedback</button>
        <button className="large-button">Inquiries</button>
        <button className="large-button">Announcements</button>
        <button className="large-button">Classes</button>
        <button className="large-button">Leaderboard</button>
      </div>
    </div>  
    
  );
}

export default Dashboard;

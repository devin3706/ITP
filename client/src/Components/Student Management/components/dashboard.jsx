import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="student-home-container">
      <div className="button-container" style={{ height: '250vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
       

        <Link to="/students" className="btn btn-primary" style={{ textDecoration: 'none', color: 'white', height: '5%', width: '80%' }}>Ask from your teacher</Link>
        
        <Link to="/attendance" className="btn btn-primary" style={{ textDecoration: 'none', color: 'white', height: '5%', width: '80%' }}>Upload Attendance Log</Link>
      
        <Link to="/bsmarks" className="btn btn-primary" style={{ textDecoration: 'none', color: 'white', height: '5%',width: '80%' }}>Business Studies Marks</Link>
        
        <Link to="/students" className="btn btn-primary" style={{ textDecoration: 'none', color: 'white', height: '5%', width: '80%' }}>Past Papers</Link>
        
        <Link to="/attendance" className="btn btn-primary" style={{ textDecoration: 'none', color: 'white', height: '5%', width: '80%' }}>Study Materials</Link>
        
        <Link to="/studentInterface" className="btn btn-primary" style={{ textDecoration: 'none', color: 'white', height: '5%', width: '80%' }}>Exam Platform</Link>
       

        <Link to="/users" className="btn btn-primary" style={{ textDecoration: 'none', color: 'white', height: '5%', width: '80%' }}> Marks</Link>
        
        <Link to="/inquiry" className="btn btn-primary" style={{ textDecoration: 'none', color: 'white', height: '5%', width: '80%' }}>Payment</Link>
        
        <Link to="/users" className="btn btn-primary" style={{ textDecoration: 'none', color: 'white', height: '5%', width: '80%' }}>Announcements</Link>
        
        <Link to="/profile" className="btn btn-primary" style={{ textDecoration: 'none', color: 'white', height: '5%', width: '80%' }}>Your Profile</Link>
       
        
        

        
      </div>
    </div>
  );
}

export default Dashboard;
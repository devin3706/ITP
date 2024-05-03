import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Profile() {
    //const [studentData, setStudentData] = useState([]);
    //const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        // Fetch profile data from backend
        axios.get('http://localhost:8081/auth/profile', { withCredentials: true })
          .then(response => {
            setProfileData(response.data);
          })
          .catch(error => {
            console.error('Error fetching profile data:', error);
          });
      }, []);
    
      const handleDeleteProfile = () => {
        axios.delete('http://localhost:8081/auth/deleteProfile', { withCredentials: true })
          .then(response => {
            console.log(response.data);
            window.location.reload();
            // Redirect or perform other actions after deleting profile
          })
          .catch(error => {
            console.error('Error deleting profile:', error);
          });
      };



    return (
        <div>
      <h2>Student Profile</h2>
      {profileData && (
        <div>
          <p>Name: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
          <p>Number: {profileData.number}</p>
          <p>School: {profileData.school}</p>
          <p>Address: {profileData.address}</p>
          
          <Link to={`/updateStudent/${profileData._id}`} className='btn btn-success mr-2'> Update</Link>
          <button onClick={handleDeleteProfile}>Delete Profile</button>
        </div>
      )}
    </div>
    );
}

export default Profile;

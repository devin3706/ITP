import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../../Exam Platform and Leaderboard/components/Header";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";

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
      <div style={{ backgroundColor: '#ECF0F5' }}>
        <Header />
        <div className="headerBtns">
          <Link to='/dashboard' className="btn btn-grey fs-6">Dashboard</Link>
        </div>
        <div className="container mt-5 mb-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-lg p-4">
                <h2 className="text-center mb-4">Student Profile</h2>
                {profileData && (
                  <div>
                    <p><strong>Name:</strong> {profileData.name}</p>
                    <p><strong>Email:</strong> {profileData.email}</p>
                    <p><strong>Number:</strong> {profileData.number}</p>
                    <p><strong>School:</strong> {profileData.school}</p>
                    <p><strong>Address:</strong> {profileData.address}</p>

                    <div className="d-flex justify-content-between mt-4">
                        <Link to={`/updateStudent/${profileData._id}`} className='btn btn-primary'>Update</Link>
                        <button onClick={handleDeleteProfile} className="btn btn-danger">Delete Profile</button>
                        <Link to="/login" className='btn btn-danger'> Log out </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
}

export default Profile;
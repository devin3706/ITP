import Header from "../../Exam Platform and Leaderboard/components/Header";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { PiUserCircle } from "react-icons/pi";

//API functions
import { getAdminProfile, logout } from '../api/admin';

const AdminProfile = () => {
  const [adminDetails, setAdminDetails] = useState(null); // State to store admin details

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        // Get username from cookie
        const cookies = document.cookie.split("; ");
        let username = "";
        for (const cookie of cookies) {
          const [name, value] = cookie.split("=");
          if (name === "adminUsername") {
            username = value;
            break;
          }
        }

        // Fetch admin details by username
        const admin = await getAdminProfile(username);
        setAdminDetails(admin);
      } catch (error) {
        console.error('Error fetching admin details:', error);
      }
    };

    fetchAdminDetails();
  }, []);

  //logout
  const navigate = useNavigate();

  const handleAdminLogout = async(e) => {
      e.preventDefault();

      logout()
          .then((res) => {
              alert(res.message);

              document.cookie = 'adminUsername=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
              
              //redirect to login page
              navigate("/adminLogin");

      }).catch(err => console.error(err));
  }
    
  return (
    <div style={{ backgroundColor: '#ECF0F5' }}>
      <Header />
      <div className="headerBtns">
        <button className="btn btn-grey fs-6" onClick={handleAdminLogout}>Log out</button>
        <Link to="/adminProfile">
            <PiUserCircle className="text-white ml-3" style={{fontSize: '70px'}}/>
        </Link>
      </div>
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow rounded-4 alert alert-info border border-dark p-4">
              <h2 className="text-center mb-4 text-dark">Admin Profile</h2>
              {adminDetails && (
                <div>
                  <p><strong className="fw-bold">First Name:</strong> {adminDetails.fName}</p>
                  <p><strong className="fw-bold">Last Name:</strong> {adminDetails.lName}</p>
                  <p><strong className="fw-bold">Username:</strong> {adminDetails.username}</p>
                  <p><strong className="fw-bold">Email:</strong> {adminDetails.email}</p>
                  <p><strong className="fw-bold">Number:</strong> 0{adminDetails.contact}</p>
                </div>
              )}
              <div className="d-flex justify-content-center col">
                  <Link to="/adminHome">                                
                      <button className="btn btn-info rounded-5 mt-4 mb-3">dashboard</button>                                
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminProfile;

import axios from 'axios';
import { setUsername } from "../../Exam Platform and Leaderboard/actions/username_actions";
import { useDispatch } from "react-redux";
import React , {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../styles.css';
import Footer from '../../Exam Platform and Leaderboard/components/Footer';
import Header from '../../Exam Platform and Leaderboard/components/Header';
//import { FaUserCircle } from 'react-icons/fa'; // Import profile icon from react-icons library


function Dashboard() {

  const dispatch = useDispatch();

  //logout
  const navigate = useNavigate();

  const handleStudentLogout = async (e) => {
      
      try {
          // Dispatching setUsername action with an empty string parameter
          dispatch(setUsername('')); 

          // Redirecting to login page
          navigate("/login");
      } catch (error) {
          console.error(error);
      }
  }

  useEffect(() => {
    // Fetch profile data from backend
    axios.get('http://localhost:8081/auth/profile', { withCredentials: true })
      .then(response => {
        dispatch(setUsername(response.data.name));
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  }, [dispatch]);

  return (
    <div style={{ backgroundColor: '#ECF0F5' }}>
      <Header/>
      <div className="headerBtns">
        <button className="btn btn-grey fs-6" onClick={handleStudentLogout}>Log out</button>
      </div>
      <div className="container mt-5 mb-5">

        {/* This is the profile card. After the header is completed, make it so that it navigates to profile after clicking the icon  */}
        <div className="row justify-content-start g-4">
          <div className="col-2">
            <Link to="/profile">
              <div className="card cardHov">
                <div className="card-body">
                  <h6 className="card-title text-center">Profile</h6>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="row row-cols-1 row-cols-md-5 g-4">

            <div className="col">
              <Link to="/pdfViewer">
                <div className="card cardHov h-100">
                  <div className="card-body">
                    <h6 className="card-title text-center">Study Materials</h6>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col">
              <Link to="/pastPaperView">
                <div className="card cardHov h-100">
                  <div className="card-body">
                    <h6 className="card-title text-center">Past Papers</h6>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col">
              <Link to="/studentInterface">
                <div className="card cardHov h-100">
                  <div className="card-body">
                    <h6 className="card-title text-center">Exam Platform</h6>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col">
              <Link to="/payment">
                <div className="card cardHov h-100">
                  <div className="card-body">
                    <h6 className="card-title text-center">Payment</h6>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col">
              <Link to="/studentFeedback">
                <div className="card cardHov h-100">
                  <div className="card-body">
                    <h6 className="card-title text-center">Feedback</h6>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col">
              <Link to="/inquiry">
                <div className="card cardHov h-100">
                  <div className="card-body">
                    <h6 className="card-title text-center">Inquiries</h6>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col">
              <Link to="/display">
                <div className="card cardHov h-100">
                  <div className="card-body">
                    <h6 className="card-title text-center">Announcements</h6>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col">
              <Link to="/readClass">
                <div className="card cardHov h-100">
                  <div className="card-body">
                    <h6 className="card-title text-center">Classes</h6>
                  </div>
                </div>
              </Link>
            </div>     

          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Dashboard;

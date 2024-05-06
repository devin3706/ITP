

import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles.css';
import Footer from '../../Exam Platform and Leaderboard/components/Footer';
import Header from '../../Exam Platform and Leaderboard/components/Header';
//import { FaUserCircle } from 'react-icons/fa'; // Import profile icon from react-icons library


function Dashboard() {
  return (
    <div style={{ backgroundColor: '#ECF0F5' }}>
      <Header/>
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
              <Link to="/">
                <div className="card cardHov h-100">
                  <div className="card-body">
                    <h6 className="card-title text-center">Results</h6>
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
              <Link to="/create">
                <div className="card cardHov h-100">
                  <div className="card-body">
                    <h6 className="card-title text-center">Feedback</h6>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col">
              <Link to="/createInquiry">
                <div className="card cardHov h-100">
                  <div className="card-body">
                    <h6 className="card-title text-center">Inquiries</h6>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col">
              <Link to="/readAnnouncement">
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

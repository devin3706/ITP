// MainLogin.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import Header from '../../Exam Platform and Leaderboard/components/Header';
import Footer from '../../Exam Platform and Leaderboard/components/Footer';

const MainLogin = () => {
  return (
    <div style={{backgroundColor: '#ECF0F5'}}>
    <Header/>
    <div className="main-login-container">
      <div className="row justify-content-center align-items-center h-100 ml-2 mr-2 mt-5">
        <div className="col-md-4 mb-3 ">
          <Card className="login-card">
            <Card.Body>
              <Card.Title>Admin Login</Card.Title>
              <Card.Text>
                Login as an admin to access admin features.
              </Card.Text>
              <Link to="/adminLogin">
                <Button variant="primary">Login</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4 mb-3">
          <Card className="login-card">
            <Card.Body>
              <Card.Title>Teacher Login</Card.Title>
              <Card.Text>
                Login as a teacher to access teacher features.
              </Card.Text>
              <Link to="/tLogin">
                <Button variant="primary">Login</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4 mb-3">
          <Card className="login-card">
            <Card.Body>
              <Card.Title>Student Login</Card.Title>
              <Card.Text>
                Login as a student to access student features.
              </Card.Text>
              <Link to="/studentLogin">
                <Button variant="primary">Login</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default MainLogin;

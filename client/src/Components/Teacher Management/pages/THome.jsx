import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import styles from '../styles/THome.module.css';
import Header from '../../Exam Platform and Leaderboard/components/Header';
import Footer from '../../Exam Platform and Leaderboard/components/Footer';
import { FaUser } from 'react-icons/fa'; // Import the user icon from react-icons/fa
import SideNavbar from "../component/SideNavbar";

const THome = () => {
    return (
        <div>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <SideNavbar />
                    <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                        <Container fluid className={`mt-5 ${styles.cardContainer}`}>
                            <Row className="justify-content-center">
                                <Col md={4} className="mt-4 mb-4" >
                                    <Card className={styles.customCard}> 
                                        <Card.Body className="text-center">
                                            <Card.Title>Feedback</Card.Title>
                                            <Link to="#feedback" className="stretched-link"></Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4} className="mt-4 mb-4">
                                    <Card className={styles.customCard}> 
                                        <Card.Body className="text-center">
                                            <Card.Title>Q&A</Card.Title>
                                            <Link to="#qna" className="stretched-link"></Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4} className="mt-4 mb-4">
                                    <Card className={styles.customCard}> 
                                        <Card.Body className="text-center">
                                            <Card.Title>Attendance</Card.Title>
                                            <Link to="#attendance" className="stretched-link"></Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4} className="mb-4">
                                    <Card className={styles.customCard}> 
                                        <Card.Body className="text-center">
                                            <Card.Title>Timetable</Card.Title>
                                            <Link to="#timetable" className="stretched-link"></Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4} className="mb-4">
                                    <Card className={styles.customCard}> 
                                        <Card.Body className="text-center">
                                            <Card.Title>Study Material</Card.Title>
                                            <Link to="/pdfApp" className="stretched-link"></Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4} className="mb-4">
                                    <Card className={styles.customCard}> 
                                        <Card.Body className="text-center">
                                            <Card.Title>Exam</Card.Title>
                                            <Link to="/" className="stretched-link"></Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                {/* New Profile Card */}
                                <Col md={4} className="mb-4">
                                    <Card className={styles.customCard}> 
                                        <Card.Body className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <Card.Title>View Profile</Card.Title>
                                                <Link to="/tProfile" className="stretched-link"></Link>
                                            </div>
                                            <div>
                                                <FaUser size={24} /> {/* User icon */}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </main>
                </div>
            </div>
          
            <Footer />

        </div>
    );
};

export default THome;

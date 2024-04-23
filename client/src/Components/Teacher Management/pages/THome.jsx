import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import Header from '../../Exam Platform and Leaderboard/components/Header';
import Footer from '../../Exam Platform and Leaderboard/components/Footer';
import { FaUser } from 'react-icons/fa'; // Import the user icon from react-icons/fa
import SideNavbar from "../component/SideNavbar";

const THome = () => {
    return (
        <div style={{backgroundColor: '#ECF0F5'}}>
        <Header />
        <SideNavbar />
        <div className="container-fluid">
            <div className="row">
                <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                    <Container fluid className={`mt-5 mb-5`}>
                        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                            <Col className="mt-4 mb-4">
                                <Card className="h-100 shadow border border-dark cardHov">
                                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                                        <Card.Title>Feedback</Card.Title>
                                        <Link to="#feedback" className="stretched-link"></Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="mt-4 mb-4">
                                <Card className="h-100 shadow border border-dark cardHov">
                                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                                        <Card.Title>Q&A</Card.Title>
                                        <Link to="#qna" className="stretched-link"></Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="mt-4 mb-4">
                                <Card className="h-100 shadow border border-dark cardHov">
                                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                                        <Card.Title>Attendance</Card.Title>
                                        <Link to="#attendance" className="stretched-link"></Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="mt-4 mb-4">
                                <Card className="h-100 shadow border border-dark cardHov">
                                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                                        <Card.Title>Timetable</Card.Title>
                                        <Link to="#timetable" className="stretched-link"></Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="mt-4 mb-4">
                                <Card className="h-100 shadow border border-dark cardHov">
                                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                                        <Card.Title>Study Material</Card.Title>
                                        <Link to="/pdfApp" className="stretched-link"></Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="mt-4 mb-4">
                                <Card className="h-100 shadow border border-dark cardHov">
                                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                                        <Card.Title>Exam</Card.Title>
                                        <Link to="/exam" className="stretched-link"></Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="mt-4 mb-4">
                                <Card className="h-100 shadow border border-dark cardHov">
                                    <Card.Body className="d-flex flex-column justify-content-between align-items-center">
                                        <div>
                                            <Card.Title>View Profile</Card.Title>
                                            <Link to="/tProfile" className="stretched-link"></Link>
                                        </div>
                                        <div>
                                            <FaUser size={24} />
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

import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import styles from '../styles/THome.module.css';

const THome = () => {
    return (
        <Container className={`mt-5 ${styles.cardContainer}`}>
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
                            <Link to="#studymaterial" className="stretched-link"></Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card className={styles.customCard}> 
                        <Card.Body className="text-center">
                            <Card.Title>Exam</Card.Title>
                            <Link to="#exam" className="stretched-link"></Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default THome;

import React from 'react';
import Header from './Components/Exam Platform and Leaderboard/components/Header.js';
import Footer from './Components/Exam Platform and Leaderboard/components/Footer.js';
import backgroundImage from './Components/Exam Platform and Leaderboard/images/image.png';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <Header />
            <div
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    minHeight: '100vh',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    backgroundColor: 'rgba(236, 240, 245, 0.9)',
                }}
            >


                <div className='d-flex justify-content-center align-items-center vh-100'>
                    <div className='container text-center pt-3'>
                        <div className="container text-center pt-5 bg-light col-5 p-4 shadow rounded-5">
                            <h2>Welcome to ABS Academy</h2>
                            <p>Where education meets Excellence</p>
                            <div className="mt-4">
                                <Link to="/mainLogin" className="btn btn-primary rounded-5">Get Started</Link>
                            </div>
                        </div>

                    </div>
                </div>

                
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
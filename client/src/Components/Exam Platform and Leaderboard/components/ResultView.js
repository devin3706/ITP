import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ResultTable from './ResultTable';
import '../styles/ResultView.css';
import Footer from '../components/Footer.js';
import Header from '../components/Header.js';

export default function ResultView() {
    const [resultId, setResultId] = useState('');

    return (
    <div>
        <div>
            <Header />
        </div>
        <div className="container">
            <h2 className='result'> View All Results </h2>
            <ResultTable />

            <div className="start">
                <Link className='btn' to={'/'}>Back to Start</Link>
            </div>
        </div>

        <div>
            <Footer />
        </div>
    </div>
    );
}

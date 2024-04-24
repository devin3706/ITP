import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ResultTable from './ResultTable';
import Footer from '../components/Footer.js';
import Header from '../components/Header.js';

export default function ResultView() {
    const [resultId, setResultId] = useState('');

    return (
    <div style={{backgroundColor: '#ECF0F5'}}>
        <div>
            <Header />
        </div>
        <div className="container col-8 mt-3">
            <h2 className='text-center mt-5 mb-4'> View All Results </h2>
            <ResultTable />

            <div className="text-center mt-3 mb-5">
                <Link className='btn btn-sm btn-primary' to={'/exam'}>Back to Start</Link>
            </div>
        </div>

        <div>
            <Footer />
        </div>
    </div>
    );
}

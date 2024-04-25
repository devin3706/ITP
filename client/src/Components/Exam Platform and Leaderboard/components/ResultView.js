import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ResultTable from './ResultTable';
import Footer from '../components/Footer.js';
import Header from '../components/Header.js';
import GenerateReport from './GenerateReport';
import { PDFDownloadLink } from '@react-pdf/renderer';

export default function ResultView() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchQueryResults, setSearchQueryResults] = useState([]); // Define state for search query results

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to update search query results
    const handleSearchResults = (results) => {
        setSearchQueryResults(results);
    };

    return (
        <div style={{ backgroundColor: '#ECF0F5' }}>
            <div>
                <Header />
            </div>
            <div className="container col-8 mt-3">
                <h2 className='text-center mt-5 mb-4'> View All Results </h2>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Username"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <ResultTable searchQuery={searchQuery} onSearchResults={handleSearchResults} /> {/* Pass handleSearchResults as prop */}
                <div className="text-center mt-3 mb-5">
                    <PDFDownloadLink document={<GenerateReport data={searchQueryResults} />} fileName="report.pdf">
                        {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : 'Download PDF'
                        }
                    </PDFDownloadLink>
                </div>
                <Link className='btn btn-sm btn-primary' to={'/exam'}>Back to Start</Link>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}
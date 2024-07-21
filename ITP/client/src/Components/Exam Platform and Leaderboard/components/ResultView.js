import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ResultTable from './ResultTable';
import Footer from '../components/Footer.js';
import Header from '../components/Header.js';
import GenerateReport from './GenerateReport';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { getServerData } from '../helper/helper.js';

export default function ResultView() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchQueryResults, setSearchQueryResults] = useState([]); // Define state for search query results
    const [examNames, setExamNames] = useState([]); // State for available exam names
    const [selectedExam, setSelectedExam] = useState(''); // State for selected exam

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to update search query results
    const handleSearchResults = (results) => {
        setSearchQueryResults(results);
    };

    useEffect(() => {
        // Fetch result data and extract unique exam names
        getServerData('http://localhost:8081/api/result', (res) => {
            setSearchQueryResults(res); // Set search query results
            const uniqueExamNames = Array.from(new Set(res.map(result => result.examName)));
            setExamNames(uniqueExamNames); // Set available exam names
        });
    }, []);

     // Function to handle dropdown change
     const handleExamChange = (event) => {
        setSelectedExam(event.target.value); // Update selected exam
    };

    // Determine the value of examName based on the selectedExam
    const ExamName = selectedExam ? selectedExam : 'Multiple Exams';

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
                <div className="mb-3">
                    <select className="form-select" onChange={handleExamChange}>
                        <option value="">Select Exam</option>
                        {examNames.map((exam, index) => (
                            <option key={index} value={exam}>{exam}</option>
                        ))}
                    </select>
                </div>
                <ResultTable searchQuery={searchQuery} selectedExam={selectedExam} onSearchResults={handleSearchResults} /> {/* Pass handleSearchResults as prop */}
                <div className="text-center mt-3 mb-5">
                    <PDFDownloadLink document={<GenerateReport data={searchQueryResults} selectedExam={ExamName} />} fileName="report.pdf">
                        {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : 'Download PDF'
                        }
                    </PDFDownloadLink>
                </div>
                <Link className='btn btn-sm btn-primary' to={'/teacherInterface'}>Back to Start</Link>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}
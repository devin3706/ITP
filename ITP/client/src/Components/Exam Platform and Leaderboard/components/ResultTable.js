import React, { useEffect, useState } from 'react';
import { getServerData } from '../helper/helper';

export default function ResultTable({ searchQuery, selectedExam, onSearchResults }) {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        getServerData('http://localhost:8081/api/result', (res) => {
            setData(res);
        });
    }, []);

    useEffect(() => {
        // Filter data based on selected exam
        const filteredByExam = selectedExam ? data.filter((result) => result.examName === selectedExam) : data;
        // Filter data based on search query within the filtered results
        const filteredData = searchQuery
            ? filteredByExam.filter((result) =>
                  result.username.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : filteredByExam;
        setFilteredData(filteredData); // Update filtered data based on selected exam and search query
    }, [searchQuery, selectedExam, data]);

    useEffect(() => {
        // Update parent component with filtered data
        onSearchResults(filteredData);
    }, [filteredData, onSearchResults]);

    return (
        <div style={{ backgroundColor: '#ECF0F5' }}>
            <div className='container col mt-3 text-center'>
                <table className='table border border-dark'>
                    <thead className=''>
                        <tr className='table-info'>
                            <td className='w-10 fw-bold border border-dark'>Name</td>
                            <td className='w-10 fw-bold border border-dark'>Exam Name</td>
                            <td className='w-15 fw-bold border border-dark'>Questions Answered</td>
                            <td className='w-5 fw-bold border border-dark'>Marks</td>
                            <td className='w-10 fw-bold border border-dark'>Result</td>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {filteredData.length === 0 ? (
                            <tr>
                                <td colSpan='5' className='text-center'>
                                    No results found
                                </td>
                            </tr>
                        ) : (
                            filteredData.map((v, i) => (
                                <tr key={i}>
                                    <td className='border border-dark'>{v?.username || ''}</td>
                                    <td className='border border-dark'>{v?.examName || ''}</td>
                                    <td className='border border-dark'>{v?.attempts || 0}</td>
                                    <td className='border border-dark'>{v?.points || 0}</td>
                                    <td className='border border-dark'>{v?.achieved || ''}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
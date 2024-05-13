import React, { useEffect, useState } from 'react';
import { getServerData } from '../helper/helper';

export default function ResultTable({ searchQuery, onSearchResults }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        getServerData('http://localhost:8081/api/result', (res) => {
            setData(res);
        });
    }, []);

    const filteredData = searchQuery
        ? data.filter((result) =>
              result.username.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : data;

    useEffect(() => {
        onSearchResults(filteredData);
    }, [searchQuery, data, onSearchResults, filteredData]);

    return (
        <div style={{ backgroundColor: '#ECF0F5' }}>
            <div className='container col mt-3 text-center'>
                <table className='table border border-dark'>
                    <thead className=''>
                        <tr className='table-info'>
                            <td className='w-10 fw-bold border border-dark'>Name</td>
                            <td className='w-15 fw-bold border border-dark'>Questions Answered</td>
                            <td className='w-5 fw-bold border border-dark'>Marks</td>
                            <td className='w-10 fw-bold border border-dark'>Result</td>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {filteredData.length === 0 ? (
                            <tr>
                                <td colSpan='4' className='text-center'>
                                    No results found
                                </td>
                            </tr>
                        ) : (
                            filteredData.map((v, i) => (
                                <tr key={i}>
                                    <td className='border border-dark'>{v?.username || ''}</td>
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

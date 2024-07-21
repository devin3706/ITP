import React, { useEffect, useState } from 'react';
import { getServerData } from '../helper/helper';
import Header from './Header';
import Footer from './Footer';

const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const resultData = await getServerData('http://localhost:8081/api/result');
                if (resultData.length > 0) {
                    // Sort the data based on points in descending order
                    const sortedData = resultData.sort((a, b) => b.points - a.points);
                    // Take the top five entries
                    const topFive = sortedData.slice(0, 5);
                    setLeaderboardData(topFive);
                } else {
                    setLeaderboardData([]);
                }
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
        };

        fetchLeaderboardData();
        const intervalId = setInterval(fetchLeaderboardData, 1000); // Update every 1 second

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div style={{backgroundColor: '#ECF0F5'}}>
        <Header/>
        <div className="container col-8 mt-3 mb-5">
            <h2 className='text-center mt-5 mb-4'>Leaderboard</h2>
            <table className='table border border-dark text-center'>
                <thead>
                    <tr className='table-info'> 
                        <th className='w-10 border border-dark'>Position</th>
                        <th className='w-20 border border-dark'>Username</th>
                        <th className='w-10 border border-dark'>Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData.map((entry, index) => (
                        <tr classname='table-body' key={index}>
                            <td className='border border-dark'>{index + 1}</td>
                            <td className='border border-dark'>{entry.username}</td>
                            <td className='border border-dark'>{entry.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <Footer/>
        </div>
    );
};

export default Leaderboard;

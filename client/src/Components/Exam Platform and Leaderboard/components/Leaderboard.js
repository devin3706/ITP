import React, { useEffect, useState } from 'react';
import { getServerData } from '../helper/helper';
import '../styles/ResultView.css';
import Header from './Header';

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
                    const topFive = sortedData.slice(0, 10);
                    setLeaderboardData(topFive);
                } else {
                    setLeaderboardData([]);
                }
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
        };

        fetchLeaderboardData();
        const intervalId = setInterval(fetchLeaderboardData, 5000); // Update every 5 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
        <Header />
        <div className="container">
            <h2 className='result'>Leaderboard</h2>
            <table>
                <thead className='table-header'>
                    <tr className='table-row'> 
                        <th>Position</th>
                        <th>Username</th>
                        <th>Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData.map((entry, index) => (
                        <tr classname='table-body' key={index}>
                            <td>{index + 1}</td>
                            <td>{entry.username}</td>
                            <td>{entry.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default Leaderboard;

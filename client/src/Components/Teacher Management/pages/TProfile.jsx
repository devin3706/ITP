import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TProfile = () => {
    const [teacherData, setTeacherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); // Get the ID from the URL params


    useEffect(() => {
        // Fetch teacher data from the server
        const fetchTeacherData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/teacher/get/${id}`); // Replace 'id' with the actual teacher ID
                setTeacherData(response.data.teacher);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            }
        };

        // Assuming you have the teacher's ID stored somewhere or passed as a prop
        
        fetchTeacherData();
    }, []);

    return (
        <div>
            <h1>Teacher Profile</h1>
            {loading ? (
                <p>Loading...</p>
            ) : teacherData ? (
                <div>
                    <h2>{`${teacherData.firstName} ${teacherData.lastName}`}</h2>
                    <p>NIC Number: {teacherData.nicNumber}</p>
                    <p>Subject: {teacherData.subject}</p>
                    <p>District: {teacherData.district}</p>
                    {/* Add more details as needed */}
                </div>
            ) : (
                <p>Teacher not found</p>
            )}
        </div>
    );
};

export default TProfile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch student data from the server
        axios.get('http://localhost:8081/profile')
            .then(response => {
                setStudent(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching student profile:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p className="loading">Loading...</p>;
    }

    if (!student) {
        return <p className="error">No student data available</p>;
    }

    return (
        <div className="profile-container">
            <h2 className="profile-title">Student Profile</h2>
            <div className="profile-details">
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>School:</strong> {student.school}</p>
                <p><strong>Address:</strong> {student.address}</p>
                <p><strong>Number:</strong> {student.number}</p>
            </div>
        </div>
    );
}

export default Profile;

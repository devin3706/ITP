import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Header from "../../Exam Platform and Leaderboard/components/Header";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";

const TDetails = () => {
    const [teachers, setTeachers] = useState([]);
    const navigate = useNavigate(); // Get the navigate function

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8081/teacher/");
            setTeachers(response.data);
        } catch (error) {
            console.error("Error fetching teacher data:", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/tUpdate/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/teacher/delete/${id}`);
            // Refresh teacher details after deletion
            fetchData();
        } catch (error) {
            console.error("Error deleting teacher:", error);
        }
    };

   /*  const displayImage = (photoData) => {
        if (photoData && photoData.data && photoData.contentType) {
            const arrayBufferView = new Uint8Array(photoData.data.data);
            const blob = new Blob([arrayBufferView], { type: photoData.contentType });
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function() {
                return reader.result;
            };
        }
        return ""; // Return an empty string if photoData is missing or incomplete
    }; */

    return (
        <div style={{ backgroundColor: '#ECF0F5' }}>
        <Header/>
        <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-center">
                <Table bordered hover responsive="sm" style={{ backgroundColor: '#FFFFFF' }}>
                    <thead>
                        <tr className="table-primary">
                            <th className="fw-bold text-dark">#</th>
                            <th className="fw-bold text-dark">First Name</th>
                            <th className="fw-bold text-dark">Last Name</th>
                            <th className="fw-bold text-dark">Subject</th>
                            <th className="fw-bold text-dark">District</th>
                            <th className="fw-bold text-dark">Education Qualification</th>
                            <th className="fw-bold text-dark">Phone Number</th>
                            <th className="fw-bold text-dark">Email</th>
                            <th className="fw-bold text-dark">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{teacher.firstName}</td>
                                <td>{teacher.lastName}</td>
                                <td>{teacher.subject}</td>
                                <td>{teacher.district}</td>
                                <td>{teacher.eduQualification}</td>
                                <td>{teacher.phoneNumber}</td>
                                <td>{teacher.email}</td>
                                <td>
                                    <Button className='btn-sm me-2' color="info" onClick={() => handleEdit(teacher._id)}>Edit</Button>
                                    <Button className='btn-sm' color="danger" onClick={() => handleDelete(teacher._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
        <Footer/>
        </div>
    );
};

export default TDetails;

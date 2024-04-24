import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Header from "../../Exam Platform and Leaderboard/components/Header";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import { PDFDownloadLink } from '@react-pdf/renderer';
import TeacherDetailsPDF from './TeacherDetailsPDF'; // Assuming you have a component to render the PDF

const TDetails = () => {
    const [teachers, setTeachers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
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
        // Show confirmation dialog
        const isConfirmed = window.confirm("Are you sure you want to delete this account?");
        if (!isConfirmed) {
            // If not confirmed, do nothing
            return;
        }
    
        try {
            // If confirmed, proceed with deletion
            await axios.delete(`http://localhost:8081/teacher/delete/${id}`);
            // Refresh teacher details after deletion
            fetchData();
        } catch (error) {
            console.error("Error deleting teacher:", error);
        }
    };

    const filteredTeachers = teachers.filter((teacher) => {
        const fullName = `${teacher.firstName} ${teacher.lastName}`;
        return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div style={{ backgroundColor: '#ECF0F5' }}>
        <Header/>
        <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-between mb-3">
                <Input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
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
                        {filteredTeachers.map((teacher, index) => (
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
            <div className="d-flex justify-content-center mt-3">
                <PDFDownloadLink
                    document={<TeacherDetailsPDF teachers={filteredTeachers} />} // Pass the filtered teachers to the PDF component
                    fileName="teacher_details.pdf"
                    style={{ textDecoration: "none", color: "#fff" }}
                >
                    {({ blob, url, loading, error }) =>
                        loading ? (
                            <Button color="primary" disabled>Loading...</Button>
                        ) : (
                            <Button color="primary">Generate Report</Button>
                        )
                    }
                </PDFDownloadLink>
            </div>
        </div>
        <Footer/>
        </div>
    );
};

export default TDetails;

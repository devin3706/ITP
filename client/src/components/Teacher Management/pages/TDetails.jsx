import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

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

    return (
        <div className="container mt-5">
            <h1 className="text-center mt-3">Teacher Details</h1>
            <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>NIC Number</th>
                        <th>Subject</th>
                        <th>District</th>
                        <th>Education Qualification</th>
                        <th>Additional Information</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Actions</th> {/* Add Actions column for Edit and Delete buttons */}
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{teacher.firstName}</td>
                            <td>{teacher.lastName}</td>
                            <td>{teacher.nicNumber}</td>
                            <td>{teacher.subject}</td>
                            <td>{teacher.district}</td>
                            <td>{teacher.eduQualification}</td>
                            <td>{teacher.additionalInfo}</td>
                            <td>{teacher.address}</td>
                            <td>{teacher.phoneNumber}</td>
                            <td>{teacher.email}</td>
                            <td>
                                {/* Edit button */}
                                <Button className='btn-sm' color="primary" onClick={() => handleEdit(teacher._id)}>Edit</Button>
                                {/* Delete button */}
                                <Button className='btn-sm' color="danger" onClick={() => handleDelete(teacher._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
        </div>
    );
};

export default TDetails;

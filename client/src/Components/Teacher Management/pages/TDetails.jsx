import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Header from "../../Exam Platform and Leaderboard/components/Header";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import { PDFDownloadLink } from '@react-pdf/renderer';
import TeacherDetailsPDF from './TeacherDetailsPDF';
import { Pie, Bar } from 'react-chartjs-2';
import domtoimage from 'dom-to-image';

const TDetails = () => {
    const [teachers, setTeachers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [districtCounts, setDistrictCounts] = useState({});
    const [pieChart, setPieChart] = useState('');
    const [barChart, setBarChart] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        countDistricts();
        generateCharts();
    }, [teachers]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8081/teacher/");
            setTeachers(response.data);
        } catch (error) {
            console.error("Error fetching teacher data:", error);
        }
    };

    const countDistricts = () => {
        const counts = {};
        teachers.forEach(teacher => {
            counts[teacher.district] = (counts[teacher.district] || 0) + 1;
        });
        setDistrictCounts(counts);
    };

    const countSubjects = () => {
        const counts = {};
        teachers.forEach(teacher => {
            counts[teacher.subject] = (counts[teacher.subject] || 0) + 1;
        });
        return counts;
    };

    const filteredTeachers = teachers.filter((teacher) => {
        const fullName = `${teacher.firstName} ${teacher.lastName}`;
        return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const generateCharts = () => {
        // Generate pie chart
        const pieChartComponent = document.getElementById('pie-chart');
        domtoimage.toPng(pieChartComponent)
            .then((dataUrl) => {
                setPieChart(dataUrl);
            })
            .catch((error) => {
                console.error('Error generating pie chart:', error);
            });

        // Generate bar chart
        const barChartComponent = document.getElementById('bar-chart');
        domtoimage.toPng(barChartComponent)
            .then((dataUrl) => {
                setBarChart(dataUrl);
            })
            .catch((error) => {
                console.error('Error generating bar chart:', error);
            });
    };

    const pieChartData = {
        labels: Object.keys(districtCounts),
        datasets: [
            {
                label: 'District Count',
                data: Object.values(districtCounts),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const subjectCounts = countSubjects();

    const barChartData = {
        labels: Object.keys(subjectCounts),
        datasets: [
            {
                label: 'Subject Count',
                data: Object.values(subjectCounts),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const handleEdit = (id) => {
        navigate(`/tUpdate/${id}`);
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this account?");
        if (!isConfirmed) {
            return;
        }
    
        try {
            await axios.delete(`http://localhost:8081/teacher/delete/${id}`);
            fetchData();
        } catch (error) {
            console.error("Error deleting teacher:", error);
        }
    };

    const handleAddTeacher = () => {
        navigate('/tCreate');
    };

    return (
        <div style={{ backgroundColor: '#ECF0F5' }}>
            <Header/>

            <center>
                <h1 className="text-center mt-3 mb-4 alert border border-dark shadow col-10" style={{fontSize: '300%', backgroundColor: '#c1dee3'}}>Teacher Details</h1>
            </center>

            
            <div className="mt-5 mb-5">
                <div className="d-flex justify-content-center mb-5">
                    <Input
                        type="text"
                        className="col-10"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    
                </div>

                <center>
                    <hr className="my-4 col-10 border-2 border-dark mb-5" />
                </center>

                <div className="d-flex justify-content-center">
                    <Table bordered responsive="sm" className="table table-striped table-light" style={{ backgroundColor: '#FFFFFF' }}>
                        <thead>
                            <tr className="table-primary text-center">
                                
                                <th className="fw-bold text-dark col-1">First Name</th>
                                <th className="fw-bold text-dark col-1">Last Name</th>
                                <th className="fw-bold text-dark col-2">Subject</th>
                                <th className="fw-bold text-dark col-1">District</th>
                                <th className="fw-bold text-dark col-1">Education Qualification</th>
                                <th className="fw-bold text-dark col-1">Phone Number</th>
                                <th className="fw-bold text-dark col-3">Email</th>
                                <th className="fw-bold text-dark col-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody >
                            {filteredTeachers.map((teacher, index) => (
                                <tr key={index}>
                                    
                                    <td>{teacher.firstName}</td>
                                    <td>{teacher.lastName}</td>
                                    <td>{teacher.subject}</td>
                                    <td>{teacher.district}</td>
                                    <td>{teacher.eduQualification}</td>
                                    <td>{teacher.phoneNumber}</td>
                                    <td>{teacher.email}</td>
                                    <td>
                                        <Button className='btn-sm me-2 rounded-3' color="info" onClick={() => handleEdit(teacher._id)}>Edit</Button>
                                        <Button className='btn-sm me-2 rounded-3' color="danger" onClick={() => handleDelete(teacher._id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div className="d-flex justify-content-center mt-3">
                    <PDFDownloadLink
                        document={<TeacherDetailsPDF teachers={filteredTeachers} pieChartData={pieChart} barChartData={barChart} />}
                        fileName="Teacher_Details.pdf"
                        style={{ textDecoration: "none", color: "#fff" }}
                    >
                        {({ loading }) => (
                            <Button color="primary" className="rounded-4" size="lg" disabled={loading}>{loading ? 'Loading...' : 'Generate Report'}</Button>
                        )}
                    </PDFDownloadLink>
                    <Button color="success" className="rounded-4" onClick={handleAddTeacher}>Add Teacher</Button>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="d-flex mt-3" style={{ width: '300px', height: '300px' }}>
                        <Pie data={pieChartData} id="pie-chart" />
                    </div>
                    <div className="d-flex mt-3 ml-5" style={{ width: '700px', height: '300px' }}>
                        <Bar data={barChartData} id="bar-chart" />
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default TDetails;

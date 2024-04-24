import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Link } from "react-router-dom";
import { PiFilesLight, PiAlarm, PiExam, PiChalkboardTeacherLight, PiStudent } from "react-icons/pi";
import '../../../styles.css';

// API functions
import { getAdminLoginsByMonth, getStudentLoginsByMonth, getTeacherLoginsByMonth, getTotalClasses, getTotalExams, getTotalFiles, getTotalStudents, getTotalTeachers, view } from "../api/admin";

// Header and Footer
//import AdminHeader from '../components/AdminHeader'
import Header from "../../Exam Platform and Leaderboard/components/Header";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";

const AdminHome = () => {
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalTeachers, setTotalTeachers] = useState(0);
    const [totalFiles, setTotalFiles] = useState(0);
    const [totalClasses, setTotalClasses] = useState(0);
    const [totalExams, setTotalExams] = useState(0);
    const [studentLoginsByMonth, setStudentLoginsByMonth] = useState([]);
    const [teacherLoginsByMonth, setTeacherLoginsByMonth] = useState([]);
    const [adminLoginsByMonth, setAdminLoginsByMonth] = useState([]);

    const [admins, setAdmins] = useState([]);

    const [currentMonth, setCurrentMonth] = useState('');
    const [currentMonthID, setCurrentMonthID] = useState(0);

    const student_LonginsCountForThisMonth = studentLoginsByMonth.find(monthData => monthData._id === currentMonthID)?.count ?? 0;
    const teacher_LonginsCountForThisMonth = teacherLoginsByMonth.find(monthData => monthData._id === currentMonthID)?.count ?? 0;
    const admin_LonginsCountForThisMonth = adminLoginsByMonth.find(monthData => monthData._id === currentMonthID)?.count ?? 0;
    
    // Fetch admins
    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const res = await view();
                setAdmins(res.admins);
            } catch (error) {
                console.error("Failed to fetch admins:", error.message);
            }
        };
        fetchAdmins();
    }, []);

    useEffect(() => {
        const fetchTotalStats = async () => {
            try {
                //total stats
                const { totalStudents } = await getTotalStudents();
                setTotalStudents(totalStudents);

                const { totalTeachers } = await getTotalTeachers();
                setTotalTeachers(totalTeachers);

                const { totalFiles } = await getTotalFiles();
                setTotalFiles(totalFiles);

                const { totalClasses } = await getTotalClasses();
                setTotalClasses(totalClasses);

                const { totalExams } = await getTotalExams();
                setTotalExams(totalExams);


                //sorting by month
                const s_LoginsByMonth = await getStudentLoginsByMonth();
                s_LoginsByMonth.sort((a, b) => a._id - b._id);
                setAdminLoginsByMonth(s_LoginsByMonth);

                const t_LoginsByMonth = await getTeacherLoginsByMonth();
                t_LoginsByMonth.sort((a, b) => a._id - b._id);
                setTeacherLoginsByMonth(t_LoginsByMonth);

                const a_LoginsByMonth = await getAdminLoginsByMonth();
                a_LoginsByMonth.sort((a, b) => a._id - b._id);
                setAdminLoginsByMonth(a_LoginsByMonth);

                //pass data to chart
                renderChart(s_LoginsByMonth, t_LoginsByMonth, a_LoginsByMonth);

                //to get current month
                const today = new Date();
                const month = today.toLocaleString('default', { month: 'long' });
                const monthID = today.getMonth() + 1;
                setCurrentMonth(month);
                setCurrentMonthID(monthID);


            } catch (error) {
                console.error('Failed to fetch total number stats:', error.message);
            }
        };

        fetchTotalStats();
    }, []);

    //line graph for user logins
    const renderChart = (studentData, teacherData, adminData) => {
        const ctx = document.getElementById('loginChart').getContext('2d');
        //student
        const studentMonths = studentData.map(month => month._id);
        const studentLogins = studentData.map(month => month.count);

        //teacher
        const teacherMonths = teacherData.map(month => month._id);
        const teacherLogins = teacherData.map(month => month.count);

        //admin
        const adminMonths = adminData.map(month => month._id);
        const adminLogins = adminData.map(month => month.count);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [
                    {
                        label: 'Student Logins',
                        data: studentLogins,
                        borderColor: '#FE9900',
                        tension: 0.1
                    },
                    {
                        label: 'Teacher Logins',
                        data: teacherLogins,
                        borderColor: '#4BC0C0',
                        tension: 0.1
                    },
                    {
                        label: 'Admin Logins',
                        data: adminLogins,
                        borderColor: '#ff6384',
                        tension: 0.1
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Month'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Number of Logins'
                        },
                        suggestedMin: 0
                    }
                }
            }
        });
    };

    return(
        <div style={{backgroundColor: '#ECF0F5'}}>
            <Header />
            <div className="container mt-5">

                <h2 className="mb-3 mt-3">Total Statistics</h2>
                <div className="row row-cols-1 row-cols-md-5 g-4 mt-1">
                
                    <div className="col mt-3">
                        <Link to="/students">                        
                            <div className="card cardDPDashboard rounded-4" style={{backgroundColor: '#FFD0A2'}}>
                                <div className="iconDPDashboard">
                                    <PiStudent />
                                </div>
                                <div className="card-body">    
                                    <h5 className="card-title text-uppercase">Students</h5>
                                    <p className="card-text fw-bold">{totalStudents}</p>
                                </div>                                
                            </div>
                        </Link>
                    </div>
                    
                    <div className="col mt-3">
                        <Link to="/tDetails">                        
                            <div className="card cardDPDashboard rounded-4" style={{backgroundColor: '#FFECA4'}}>
                                <div className="iconDPDashboard">
                                    <PiChalkboardTeacherLight />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title text-uppercase">Teachers</h5>
                                    <p className="card-text fw-bold">{totalTeachers}</p>
                                </div>                                
                            </div>                        
                        </Link>
                    </div>

                    <div className="col mt-3">
                        <Link to="/pdfApp">                        
                            <div className="card cardDPDashboard rounded-4" style={{backgroundColor: '#CFFFBF'}}>
                                <div className="iconDPDashboard">
                                    <PiFilesLight />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title text-uppercase">Files</h5>
                                    <p className="card-text fw-bold">{totalFiles}</p>
                                </div>                                    
                            </div>                        
                        </Link>
                    </div>

                    <div className="col mt-3">
                        <Link to="/#">                        
                            <div className="card cardDPDashboard rounded-4" style={{backgroundColor: '#A0F5FF'}}>
                                <div className="iconDPDashboard">
                                    <PiAlarm />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title text-uppercase">Classes</h5>
                                    <p className="card-text fw-bold">{totalClasses}</p>
                                </div>                                
                            </div>                        
                        </Link>
                    </div>

                    <div className="col mt-3 mb-5">
                        <Link to="/teacherInterface">                        
                            <div className="card cardDPDashboard rounded-4" style={{backgroundColor: '#DDDDFF '}}>
                                <div className="iconDPDashboard">
                                    <PiExam />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title text-uppercase">Exams</h5>
                                    <p className="card-text fw-bold">{totalExams}</p>
                                </div>                                
                            </div>                        
                        </Link>
                    </div>

                </div>

                <hr className="my-4 border-2 border-dark" /> 

                <div className="row mt-1 mb-5">
                    <div className="col-8 mt-5 border border-dark rounded-4 shadow">
                        <h2 className="mb-3 mt-3">Login Statistics</h2>
                        <h4>Month: {currentMonth}</h4>
                        <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
                            <div className="col">
                                <div className="card rounded-4" style={{backgroundColor: '#FEC978'}}>
                                    <div className="card-body">
                                        <h5 className="card-title text-uppercase">Student Logins</h5>
                                        <p className="card-text fw-bold">{student_LonginsCountForThisMonth}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card rounded-4" style={{backgroundColor: '#69E0E0'}}>
                                    <div className="card-body">
                                        <h5 className="card-title text-uppercase">Teacher Logins</h5>
                                        <p className="card-text fw-bold">{teacher_LonginsCountForThisMonth}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card rounded-4" style={{backgroundColor: '#FB92A8'}}>
                                    <div className="card-body">
                                        <h5 className="card-title text-uppercase">Admin Logins</h5>
                                        <p className="card-text fw-bold">{admin_LonginsCountForThisMonth}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container shadow border border-info rounded mb-3">
                            <canvas id="loginChart"></canvas>
                        </div>
                        
                    </div>
                    <div className="col mt-5 ml-4 border border-dark rounded-4 shadow">
                        <h2 className="mb-5 mt-3">Admin Panel</h2>
                        <div className="scrollable-table">
                            <table className="table table-striped table-bordered table-light text-start mt-1">
                                <thead>
                                    <tr className="table-dark text-dark">
                                        <th className="w-auto fw-bold text-dark">#</th>
                                        <th className="w-auto fw-bold text-dark">Name</th>
                                        <th className="w-auto fw-bold text-dark">Username</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {admins.map((admin, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{admin.fName}</td>
                                        <td>{admin.username}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="row mt-4">
                            <div className="d-flex justify-content-start col">
                                <Link to="/adminCreate">                                
                                    <button className="btn btn-primary rounded-5">new</button>                                
                                </Link>
                            </div>

                            <div className="d-flex justify-content-end col">
                                <Link to="/adminDetails">                                
                                    <button className="btn btn-info rounded-5">view</button>                                
                                </Link>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminHome;

import React, { useState, useEffect, useContext } from "react";
import Chart from "chart.js/auto";
import { Link, useNavigate } from "react-router-dom";
import { PiFilesLight, PiAlarm, PiExam, PiChalkboardTeacherLight, PiStudent, PiUserCircle } from "react-icons/pi";
import { AdminContext } from "../../../AdminContext.js";
import { setUsername } from "../../Exam Platform and Leaderboard/actions/username_actions";
import { useDispatch } from "react-redux";
import '../../../styles.css';
import { jsPDF } from 'jspdf';

// API functions
import { 
    getAdminLoginsByMonth, getStudentLoginsByMonth, getTeacherLoginsByMonth, getTotalClasses, logout,
    getTotalExams, getTotalFiles, getTotalStudents, getTotalTeachers, view, getDistrictWithMostTeachers
} from "../api/admin";

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

    const [teacherDistrict, setTeacherDistrict] = useState(null);

    const [admins, setAdmins] = useState([]);

    const [currentMonth, setCurrentMonth] = useState('');
    const [currentMonthID, setCurrentMonthID] = useState(0);

    const student_LonginsCountForThisMonth = studentLoginsByMonth.find(monthData => monthData._id === currentMonthID)?.count ?? 0;
    const teacher_LonginsCountForThisMonth = teacherLoginsByMonth.find(monthData => monthData._id === currentMonthID)?.count ?? 0;
    const admin_LonginsCountForThisMonth = adminLoginsByMonth.find(monthData => monthData._id === currentMonthID)?.count ?? 0;

    const {admin} = useContext(AdminContext);

    const dispatch = useDispatch();
    dispatch(setUsername(admin));
    
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

                //highest frequency district
                const data = await getDistrictWithMostTeachers();
                setTeacherDistrict(data);

                //sorting by month
                const s_LoginsByMonth = await getStudentLoginsByMonth();
                s_LoginsByMonth.sort((a, b) => a._id - b._id);
                setStudentLoginsByMonth(s_LoginsByMonth);

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

    //Creating the User logins report in PDF format
    const generatePDFReport = () => {
        const doc = new jsPDF();
    
        //current month
        doc.text('Login statics for the current month:', 10,20)
        doc.text(`Month: ${currentMonth}`, 10, 30);
        doc.text(`Student Logins: ${student_LonginsCountForThisMonth}`, 20, 40);
        doc.text(`Teacher Logins: ${teacher_LonginsCountForThisMonth}`, 20, 50);
        doc.text(`Admin Logins: ${admin_LonginsCountForThisMonth}`, 20, 60);

        // all months
        // let loopCtrl = 1;
        doc.text('Login statistics for all months:', 10, 80);

        doc.text('Student logins', 20, 90);

        let yPos = 100;
        
        studentLoginsByMonth.forEach((monthData, index) => {
            const { _id, count } = monthData;
            const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][_id - 1];
            doc.text(`${monthName}: ${count}`, 30, yPos + index * 10);
            //loopCtrl++;
        });

        // yPos = yPos + loopCtrl * 10;                                                            //yPos = 110
        doc.text('Teacher logins', 80, 90);

        yPos = 100;

        teacherLoginsByMonth.forEach((monthData, index) => {
            const { _id, count } = monthData;
            const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][_id - 1];
            doc.text(`${monthName}: ${count}`, 90, yPos + index * 10);
            //loopCtrl++;
        });

        //yPos = yPos + loopCtrl * 10;
        doc.text('Admin logins', 140, 90);

        yPos = 100;

        adminLoginsByMonth.forEach((monthData, index) => {
            const { _id, count } = monthData;
            const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][_id - 1];
            doc.text(`${monthName}: ${count}`, 150, yPos + index * 10);
        });

    
        doc.save('LoginStatistics.pdf');
    };

    //logout
    const navigate = useNavigate();

    const handleAdminLogout = async(e) => {
        e.preventDefault();

        logout()
            .then((res) => {
                alert(res.message);
                
                //redirect to login page
                navigate("/adminLogin");

        }).catch(err => console.error(err));
    }

    return(
        <div style={{backgroundColor: '#ECF0F5'}}>
            <Header />
            <div className="headerBtns">
                <button className="btn btn-grey fs-6" onClick={handleAdminLogout}>Log out</button>
                <Link to="/adminProfile">
                    <PiUserCircle className="text-white ml-3" style={{fontSize: '70px'}}/>
                </Link>
            </div>
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
                        <Link to="/readClass">                        
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

                <div className="row mt-1">
                    <div className="col-8 mt-5 border border-dark rounded-4 shadow">                        
                        <div className="row">
                            <h2 className="mb-3 mt-3 col">Login Statistics</h2>
                            <button className="btn btn-primary rounded-5 justify-content-end col-3 w-auto h-25 mt-4 mr-3" onClick={generatePDFReport}>Download Report</button>
                        </div>
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

                <div className="row mt-3 mb-5 border border-dark shadow rounded-4 p-3">
                    <h2 className="mb-5 mt-3 col">Location Statistics</h2>
                    <div className="row">
                        <h5 className="col">
                            {teacherDistrict ? (
                                <div>
                                    <p>Most Teachers are from: {teacherDistrict._id}</p>
                                    <p>Number of Teachers: {teacherDistrict.tCount}</p>
                                </div>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </h5>
                        <h5 className="col">
                            {teacherDistrict ? (
                                <div>
                                </div>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </h5>
                    </div>

                    <div className="d-flex justify-content-end col">
                        <Link to="/geography">
                            <button className="btn btn-info rounded-5">More Details</button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminHome;
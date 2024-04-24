// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { AdminContext } from "./AdminContext";
import Homepage from "./Homepage.js";


// Exam components
import Main from './components/Exam Platform and Leaderboard/components/Main';
import Quiz from './components/Exam Platform and Leaderboard/components/Quiz';
import Result from './components/Exam Platform and Leaderboard/components/Result';
import ResultView from './components/Exam Platform and Leaderboard/components/ResultView';
import { CheckUserExist } from './components/Exam Platform and Leaderboard/helper/helper';
import Test from './components/Exam Platform and Leaderboard/components/Test';
import EditQuestion from './components/Exam Platform and Leaderboard/components/EditQuestion';
import Footer from './components/Exam Platform and Leaderboard/components/Footer';
import Header from './components/Exam Platform and Leaderboard/components/Header';
import CreateQuestion from './components/Exam Platform and Leaderboard/components/CreateQuestion';
import Leaderboard from './components/Exam Platform and Leaderboard/components/Leaderboard';
import StudentInterface from './components/Exam Platform and Leaderboard/components/StudentInterface.js';
import TeacherInterface from './components/Exam Platform and Leaderboard/components/TeacherInterface.js';

// Teacher components
import THome from "./components/Teacher Management/pages/THome";
import TCreate from './components/Teacher Management/pages/TCreate';
import TLogin from './components/Teacher Management/pages/TLogin';
import TDetails from './components/Teacher Management/pages/TDetails';
import THeader from './components/Teacher Management/component/THeader';
import Tpagetest from './components/Teacher Management/pages/Tpagetest';
import TUpdate from './components/Teacher Management/pages/TUpdate.jsx';
import SideNavbar from './components/Teacher Management/component/SideNavbar';
import TProfile from './components/Teacher Management/pages/TProfile.jsx';
import MainLogin from './components/Teacher Management/pages/MainLogin.jsx';
import TEnterEmail from './components/Teacher Management/pages/TEnterEmail.jsx';
import ResetPassword from './components/Teacher Management/pages/ResetPassword.jsx';
import ParentComponent from './components/Teacher Management/pages/ParentComponent.jsx';

// Admin components
import AdminHome from './components/Daily Process Dashboard/pages/AdminHome.jsx';
import AdminCreate from './components/Daily Process Dashboard/pages/AdminCreate';
import AdminLogin from './components/Daily Process Dashboard/pages/AdminLogin';
import AdminDetails from './components/Daily Process Dashboard/pages/AdminDetails';
import AdminHeader from './components/Daily Process Dashboard/components/AdminHeader.jsx';

// Admin API functions
import { getLoggedInAdmin } from './components/Daily Process Dashboard/api/admin.js';

// Study Material components
import PdfApp from './components/Study Material and Past Paper Management/PdfApp.js';
import PdfComp from './components/Study Material and Past Paper Management/PdfComp.js';
import PdfViewer from './components/Study Material and Past Paper Management/PdfViewer.jsx';
import PastPaperView from './components/Study Material and Past Paper Management/PastPaperView.jsx';
import PastPaperUpload from './components/Study Material and Past Paper Management/PastPaperUpload.jsx';

// Student Support System
import Users from './components/Student Support/components/Users.jsx';
import CreateUser from './components/Student Support/components/CreateUser.jsx';
import UpdateUser from './components/Student Support/components/UpdateUser.jsx';
import Questions from './components/Student Support/components/Questions.jsx';
import Questions1 from './components/Student Support/components/Questions1.jsx';
import Questions2 from './components/Student Support/components/Questions2.jsx';
import QuectionTeacher from './components/Student Support/components/QuectionTeacher.jsx';
import UpdateQuestions from './components/Student Support/components/UpdateQuestions';

//Student Management
import Dashboard from './components/Student Management/components/dashboard.jsx';
import Students from './components/Student Management/components/Students.jsx';
import CreateStudent from './components/Student Management/components/CreateStudent.jsx';
import UpdateStudent from './components/Student Management/components/UpdateStudent.jsx';


//Payment Management
import Payment from "./components/Payment Management/Add Payment/Payment.js";
import PayOnline from "./components/Payment Management/PayOnline/PayOnline.js";
import Payments from "./components/Payment Management/Payment Details/Payments.js";
import PayDetails from "./components/Payment Management/PayerDetails/payDetails.js";
import EditPayments from "./components/Payment Management/EditPayment/EditPayments.js";

//Announcement Handling
import Announcement from "./components/Announcement Handling/Home/Home.jsx";

//Class Scheduling
import Class from "./components/Class Scheduling/Home/Class.jsx";

const App = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const unsubscribe = getLoggedInAdmin().then((res) => {
      // Leave empty without any action
    }).catch((err) => {
      // Leave empty without any action
    });

    return () => unsubscribe;
  }, []);

  return (
    <Router>
      <AdminContext.Provider value={{ admin, setAdmin }}>
        <Routes>

          {/* Public Routes */}
          <Route exact path="/" element={<Homepage />} />

          {/* Exam routes */}
          <Route path="/exam" element={<Main />} />
          <Route path="/quiz" element={<CheckUserExist><Quiz /></CheckUserExist>} />
          <Route path="/result" element={<CheckUserExist><Result /></CheckUserExist>} />
          <Route path="/resultView" element={<ResultView />} />
          <Route path="/test" element={<Test />} />
          <Route path="/editQuestion" element={<EditQuestion />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/header" element={<Header />} />
          <Route path="/createQuestion" element={<CreateQuestion />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/studentInterface" element={<StudentInterface />} />
          <Route path="/teacherInterface" element={<TeacherInterface />} />

          {/* Teacher routes */}
          <Route path="/tHome" element={<THome />} />
          <Route path="/tCreate" element={<TCreate />} />
          <Route path="/tLogin" element={<TLogin />} />
          <Route path="/tDetails" element={<TDetails />} />
          <Route path="/tpagetest" element={<Tpagetest />} />
          <Route path="/tUpdate/:id" element={<TUpdate />} />
          <Route path="/tHeader" element={<THeader />} />
          <Route path="/sideNavbar" element={<SideNavbar />} />
          <Route path="/tProfile" element={<TProfile />} />
          <Route path="/mainLogin" element= {<MainLogin/>} />
          <Route path="/tEnterEmail" element={<TEnterEmail />} />
          <Route path="/resetPassword/:resetToken/:email" element= {<ResetPassword/>} />
          <Route path="/parentComponent" element= {<ParentComponent/>} />
        


          {/* Admin routes */}
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/adminCreate" element={<AdminCreate />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminDetails" element={<AdminDetails />} />
          <Route path="/adminHeader" element={<AdminHeader />} />

          {/* Study Material Routes */}
          <Route path="/pdfApp" element={<PdfApp />} />
          <Route path="/pdfComp" element={<PdfComp />} />
          <Route path="/pdfViewer" element={<PdfViewer />} />
          <Route path="/pastPaperView" element={<PastPaperView />} />
          <Route path="/pastPaperUpload" element={<PastPaperUpload />} />

          {/* Student Support routes */}
          <Route path='/users' element={<Users />}></Route>
          <Route path='/create' element={<CreateUser />}></Route>
          <Route path='/update/:id' element={<UpdateUser />}></Route>
          <Route path='/question' element={<Questions />}></Route>
          <Route path='/question1' element={<Questions1 />}></Route>
          <Route path='/question2' element={<Questions2 />}></Route>
          <Route path='/questionTeacher' element={<QuectionTeacher />}></Route>
          <Route path='/updateQuestions' element={<UpdateQuestions />}></Route>

          {/* Student Management Routes */}
          <Route path = '/students' element = {<Students />}> </Route>
          <Route path = '/dashboard' element = {<Dashboard/>}> </Route>
          <Route path = '/createStudent' element = {<CreateStudent/>}> </Route>
          <Route path = '/updateStudent/:id' element = {<UpdateStudent />}> </Route>

          {/* Payment Management Routes */}
          <Route path="/payment" element={<Payment />} />
          <Route path="/paymentdetails" element={<Payments />} />
          <Route path="/onlinePay" element={<PayOnline />} />
          <Route path="/payerDetails" element={<PayDetails />} />
          <Route path="/editpayments/:Workoutid" element={<EditPayments />} />

          {/* Announcement Handling Routes */}
          <Route path="/announcement" element={<Announcement />} />

          {/* Class Scheduling Routes */}
          <Route path="/class" element={<Class />} />

        </Routes>
      </AdminContext.Provider>
    </Router>
  );
};

export default App;

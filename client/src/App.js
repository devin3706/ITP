// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { AdminContext } from "./AdminContext";
import Homepage from "./Homepage.js";


// Exam components
import Main from './Components/Exam Platform and Leaderboard/components/Main';
import Quiz from './Components/Exam Platform and Leaderboard/components/Quiz';
import Result from './Components/Exam Platform and Leaderboard/components/Result';
import ResultView from './Components/Exam Platform and Leaderboard/components/ResultView';
import { CheckUserExist } from './Components/Exam Platform and Leaderboard/helper/helper';
import Test from './Components/Exam Platform and Leaderboard/components/Test';
import EditQuestion from './Components/Exam Platform and Leaderboard/components/EditQuestion';
import Footer from './Components/Exam Platform and Leaderboard/components/Footer';
import Header from './Components/Exam Platform and Leaderboard/components/Header';
import CreateQuestion from './Components/Exam Platform and Leaderboard/components/CreateQuestion';
import Leaderboard from './Components/Exam Platform and Leaderboard/components/Leaderboard';

// Teacher components
import THome from "./Components/Teacher Management/pages/THome";
import TCreate from './Components/Teacher Management/pages/TCreate';
import TLogin from './Components/Teacher Management/pages/TLogin';
import TDetails from './Components/Teacher Management/pages/TDetails';
import THeader from './Components/Teacher Management/component/THeader';
import TUpdate from './Components/Teacher Management/pages/TUpdate.jsx';
import SideNavbar from './Components/Teacher Management/component/SideNavbar';
import TProfile from './Components/Teacher Management/pages/TProfile.jsx';
import MainLogin from './Components/Teacher Management/pages/MainLogin.jsx';
import TEnterEmail from './Components/Teacher Management/pages/TEnterEmail.jsx';
import ResetPassword from './Components/Teacher Management/pages/ResetPassword.jsx';


// Admin components
import AdminHome from './Components/Daily Process Dashboard/pages/AdminHome.jsx';
import AdminCreate from './Components/Daily Process Dashboard/pages/AdminCreate';
import AdminLogin from './Components/Daily Process Dashboard/pages/AdminLogin';
import AdminDetails from './Components/Daily Process Dashboard/pages/AdminDetails';
import AdminHeader from './Components/Daily Process Dashboard/components/AdminHeader.jsx';

// Admin API functions
import { getLoggedInAdmin } from './Components/Daily Process Dashboard/api/admin.js';

// Study Material components
import PdfApp from './Components/Study Material and Past Paper Management/PdfApp.js';
import PdfComp from './Components/Study Material and Past Paper Management/PdfComp.js';
import PdfViewer from './Components/Study Material and Past Paper Management/PdfViewer.jsx';

// Student Support System
import Users from './Components/Student Support/components/Users.jsx';
import CreateUser from './Components/Student Support/components/CreateUser.jsx';
import UpdateUser from './Components/Student Support/components/UpdateUser.jsx';
import Questions from './Components/Student Support/components/Questions.jsx';
import Questions1 from './Components/Student Support/components/Questions1.jsx';
import Questions2 from './Components/Student Support/components/Questions2.jsx';
import QuectionTeacher from './Components/Student Support/components/QuectionTeacher.jsx';
import UpdateQuestions from './Components/Student Support/components/UpdateQuestions';

//Student Management
import Dashboard from './Components/Student Management/components/dashboard.jsx';
import Students from './Components/Student Management/components/Students.jsx';
import CreateStudent from './Components/Student Management/components/CreateStudent.jsx';
import UpdateStudent from './Components/Student Management/components/UpdateStudent.jsx';


//Payment Management
import Payment from "./Components/Payment Management/Add Payment/Payment.js";
import PayOnline from "./Components/Payment Management/PayOnline/PayOnline.js";
import Payments from "./Components/Payment Management/Payment Details/Payments.js";
import PayDetails from "./Components/Payment Management/PayerDetails/payDetails.js";
import EditPayments from "./Components/Payment Management/EditPayment/EditPayments.js";

//Announcement Handling
import Announcement from "./Components/Announcement Handling/Home/Home.jsx";

//Class Scheduling
import Class from "./Components/Class Scheduling/Home/Class.jsx";

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

          {/* Teacher routes */}
          <Route path="/tHome" element={<THome />} />
          <Route path="/tCreate" element={<TCreate />} />
          <Route path="/tLogin" element={<TLogin />} />
          <Route path="/tDetails" element={<TDetails />} />
          <Route path="/tUpdate/:id" element={<TUpdate />} />
          <Route path="/tHeader" element={<THeader />} />
          <Route path="/sideNavbar" element={<SideNavbar />} />
          <Route path="/tProfile" element={<TProfile />} />
          <Route path="/mainLogin" element= {<MainLogin/>} />
          <Route path="/tEnterEmail" element={<TEnterEmail />} />
          <Route path="/resetPassword/:resetToken/:email" element= {<ResetPassword/>} />
         

        


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

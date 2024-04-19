// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { AdminContext } from "./AdminContext";


// Exam components
import Main from './Components/Exam Platform and Leaderboard/components/Main';
import Quiz from './Components/Exam Platform and Leaderboard/components/Quiz';
import Result from './Components/Exam Platform and Leaderboard/components/Result';
import ResultView from './Components/Exam Platform and Leaderboard/components/ResultView';
import { CheckUserExist } from './Components/Exam Platform and Leaderboard/helper/helper.js';
import Test from './Components/Exam Platform and Leaderboard/components/Test';
import EditQuestion from './Components/Exam Platform and Leaderboard/components/EditQuestion';
import Footer from './Components/Exam Platform and Leaderboard/components/Footer';
import Header from './Components/Exam Platform and Leaderboard/components/Header';

// Teacher components
import THome from "./Components/Teacher Management/pages/THome";
import TCreate from './Components/Teacher Management/pages/TCreate';
import TLogin from './Components/Teacher Management/pages/TLogin';
import TDetails from './Components/Teacher Management/pages/TDetails';
import THeader from './Components/Teacher Management/component/THeader';
import Tpagetest from './Components/Teacher Management/pages/Tpagetest';
import TUpdate from './Components/Teacher Management/pages/TUpdate';
import SideNavbar from './Components/Teacher Management/component/SideNavbar';
import CreateQuestion from './Components/Exam Platform and Leaderboard/components/CreateQuestion.js';
import TProfile from './Components/Teacher Management/pages/TProfile.jsx';
import MainLogin from './Components/Teacher Management/pages/MainLogin.jsx';

// Admin components
import AdminHome from './Components/Daily Process Dashboard/pages/AdminHome.jsx';
import AdminCreate from './Components/Daily Process Dashboard/pages/AdminCreate';
import AdminLogin from './Components/Daily Process Dashboard/pages/AdminLogin';
import AdminDetails from './Components/Daily Process Dashboard/pages/AdminDetails';
import AdminEdit from './Components/Daily Process Dashboard/pages/AdminEdit';
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



const App = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const unsubscribe = getLoggedInAdmin().then((res) => {
      if (res.error) alert(res.error);
      else setAdmin(res.username);
    }).catch((err) => alert(err));

    return () => unsubscribe;
  }, []);

  return (
    <Router>
      <AdminContext.Provider value={{ admin, setAdmin }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/quiz" element={<CheckUserExist><Quiz /></CheckUserExist>} />
          <Route path="/result" element={<CheckUserExist><Result /></CheckUserExist>} />
          <Route path="/resultView" element={<ResultView />} />
          <Route path="/test" element={<Test />} />
          <Route path="/editQuestion" element={<EditQuestion />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/header" element={<Header />} />
          <Route path="/createQuestion" element={<CreateQuestion />} />

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

          {/* Admin routes */}
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/adminCreate" element={<AdminCreate />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminDetails" element={<AdminDetails />} />
          <Route path="/adminEdit/:adminID" element={<AdminEdit />} />
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

        </Routes>
      </AdminContext.Provider>
    </Router>
  );
};

export default App;

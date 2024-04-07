import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

// Admin components
import AdminHome from './Components/Daily Process Dashboard/pages/AdminHome.jsx';
import AdminCreate from './Components/Daily Process Dashboard/pages/AdminCreate';
import AdminLogin from './Components/Daily Process Dashboard/pages/AdminLogin';
import AdminDetails from './Components/Daily Process Dashboard/pages/AdminDetails';
import AdminEdit from './Components/Daily Process Dashboard/pages/AdminEdit';
import AdminHeader from './Components/Daily Process Dashboard/components/AdminHeader.jsx';

// Admin API functions
import { getLoggedInAdmin } from './Components/Daily Process Dashboard/api/admin.js';

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

          {/* Teacher routes */}
          <Route path="/tHome" element={<THome />} />
          <Route path="/tCreate" element={<TCreate />} />
          <Route path="/tLogin" element={<TLogin />} />
          <Route path="/tDetails" element={<TDetails />} />
          <Route path="/tpagetest" element={<Tpagetest />} />
          <Route path="/tUpdate/:id" element={<TUpdate />} />
          <Route path="/tHeader" element={<THeader />} />
          <Route path="/sideNavbar" element={<SideNavbar />} />

          {/* Admin routes */}
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/adminCreate" element={<AdminCreate />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminDetails" element={<AdminDetails />} />
          <Route path="/adminEdit/:adminID" element={<AdminEdit />} />
          <Route path="/adminHeader" element={<AdminHeader />} />
        </Routes>
      </AdminContext.Provider>
    </Router>
  );
};

export default App;

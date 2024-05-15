import React, { useState } from 'react';
import Cookies from 'js-cookie';
import {
    FaTh,
    FaBars,
    FaUsers,
    FaSignOutAlt ,
    FaRegChartBar,
    FaCommentAlt,
    FaBook,
    FaUserCircle,
    FaQuestionCircle,
    FaCalendarAlt,
    FaBullhorn,
    FaUserCheck
     
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import './SideNavbar.css';


const SideNavbar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const logout = () => {
        // Remove the token from localStorage
        localStorage.removeItem("token");
        // Remove the email cookie
        Cookies.remove("email");
        // Redirect to the login page
            window.location.href = '/tLogin';
            };
    
        const menuItem = [
            {
                path: "/tHome",
                name: "Dashboard",
                icon: <FaTh />
            },
            {
                path: "/teacherFeedback", // Feedback path
                name: "Feedback",
                icon: <FaCommentAlt />
            },
            {
                path: "/updateInquiry", // Q&A path
                name: "Q&A",
                icon: <FaQuestionCircle />
            },
            {
                path: "/createClass", // Timetable path
                name: "Timetable",
                icon: <FaCalendarAlt />
            },
            {
                path: "/createAnnouncement", // Announcements path
                name: "Announcements",
                icon: <FaBullhorn />
            },
            {
                path: "/teacherInterface", // Exam path
                name: "Exam",
                icon: <FaBook />
            },
            {
                path: "/bsmarks", // Marks path
                name: "Marks",
                icon: <FaRegChartBar />
            },
            {
                path: "/attendance", // Attendance path
                name: "Attendance",
                icon: <FaUserCheck />
            },
            {
                path: "/tProfile", // Profile path
                name: "Profile",
                icon: <FaUserCircle />
            },
            {
                path: "/tInterfaceDetails", // Profile path
                name: "All Teacher",
                icon: <FaUsers />
            },
            {
                path: '/tLogin',
                name: 'Logout',
                icon: <FaSignOutAlt />,
                onClick: logout
            }
        ];
        
    return (
        <div className="nvbcontainer">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="bars"></h1>
                   <div style={{marginLeft: isOpen ? "0px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active" onClick={item.onClick}>
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};


export default SideNavbar;

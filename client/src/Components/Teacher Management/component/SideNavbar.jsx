import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaSignOutAlt ,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
     
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import '../styles/SideNavbar.css';


const SideNavbar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/tHome",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/tLogin",
            name: "Logout",
            icon: <FaSignOutAlt />
        }
        /* {
            path: "/tCreate",
            name: "Add ",
            icon: <FaUserAlt />
        },
        {
            path: "/tLogin",
            name: "Login",
            icon: <FaRegChartBar />
        },
        {
            path: "/tDetails",
            name: "List",
            icon: <FaCommentAlt />
        },
        {
            path: "/tpagetest",
            name: "test",
            icon: <FaShoppingBag />
        }, */
        
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="bars"></h1>
                   <div style={{marginLeft: isOpen ? "0px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
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

import React from "react";
import { Link } from "react-router-dom";

const THeader = () => {
    return(
<nav className="navbar navbar-expand-lg navbar-dark " style={{ backgroundColor: '#021531'}} >
            <div className="container-fluid">
            <Link className="navbar-brand" to="/">Teacher Dashboard</Link>
            <button 
                className="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarNav" 
                aria-controls="navbarNav" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav">

                <li className="nav-item ">
                <Link className="nav-link" to="/tCreate">Add new Teacher</Link>
                </li>

                <li className="nav-item">
                <Link className="nav-link" to="/tLogin">Log in</Link>
                </li>

                <li className="nav-item">
                <Link className="nav-link" to="/tDetails">Teacher Details</Link>
                </li>

                <li className="nav-item">
                <Link className="nav-link" to="/tpagetest">Page Test</Link>
                </li>

                <li className="nav-item">
                <Link className="nav-link" to="/tUpdate"> Teacher_Update</Link>
                </li>

            </ul>
            </div>
        </div>
        </nav>
    );
};

export default THeader;
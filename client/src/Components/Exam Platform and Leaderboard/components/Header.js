import React from 'react';
import './header.css'; 
import logo from '../images/logo.png';
function Header() {
  return (
    <div className="header">
      <div className="logo col-5">
        <img src={logo} alt="Logo" />
      </div>
      <div className="academy-text col-5">We Strive to bring out the best in students</div>
    </div>
  );
}

export default Header;
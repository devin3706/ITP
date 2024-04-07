import React from 'react';
import '../styles/header.css'; 
import logo from '../images/logo.png';
function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="academy-text">Hi Mr Nandana</div>
      <button className="login-btn">Login</button>
    </div>
  );
}

export default Header;
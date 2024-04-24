import React from 'react';
import './header.css'; 
import logo from '../images/logo.png';
function Header() {
  return (
    <div className="header">
      <div className="logo col-5">
        <img src={logo} alt="Logo" />
      </div>
      <div className="academy-text col-5">Hi Mr Nandana</div>
      <div className='col-1'>  
        <button className="login-btn ">Login</button>
      </div>
    </div>
  );
}

export default Header;
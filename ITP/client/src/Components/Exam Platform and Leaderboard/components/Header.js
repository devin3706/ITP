import React from 'react';
import { useSelector } from 'react-redux';
import './header.css'; 
import logo from '../images/logo.png';
function Header() {

  const username = useSelector(state => state.name.name)

  return (
    <div className="header">
      <div className="logo col-5">
        <img src={logo} alt="Logo" />
      </div>
      <div className="academy-text col-5">
        {username ? `Welcome ${username}` : 'We strive to achieve excellence'}
      </div>
    </div>
  );
}

export default Header;
//import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";
import React from "react";
import {BrowserRouter as Router, Route, Routes, Redirect} from "react-router-dom";

//components
import SideNavbar from './component/SideNavbar';
import THome from "./pages/THome";
import TCreate from './pages/TCreate';
import TLogin from './pages/TLogin';
import TDetails from './pages/TDetails';
import THeader from './component/THeader';
import Tpagetest from './pages/Tpagetest';
import TUpdate from './pages/TUpdate';

//routes
const App = () =>{
  return(
    
    <Router> 
      
      <THeader />
      <SideNavbar >
      <Routes>
        <Route exact path="/" element={<THome />} />
        <Route exact path="tCreate"  element={<TCreate/>}/>
        <Route exact path="/tLogin"  element={<TLogin/>}/>
        <Route exact path="/tDetails" element={<TDetails/>}/>
        <Route exact path="/tpagetest" element={<Tpagetest/>}/>  
        <Route path="/tUpdate/:id" element={<TUpdate />} />
      </Routes>
      </SideNavbar>
    </Router>
  )
}

export default App;
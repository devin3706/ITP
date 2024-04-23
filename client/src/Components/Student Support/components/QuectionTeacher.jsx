import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";

function QuectionTeacher() {
    return (
        <div className="vh-100" style={{backgroundColor: '#ECF0F5'}}>
        <Header/>
            <form className="mt-5 mb-5">
                <h1 className="text-center mt-4">Select Your Teacher</h1>
                <div className="row justify-content-md-center mt-5">
                    <Link to="/question" className="btn btn-success col-2 ml-4">Mr.Nandana</Link><br></br><br></br>
        
                    <Link to="/question1" className="btn btn-success col-2 ml-4">Mr.Prabath</Link><br></br><br></br>

                    <Link to="/question2" className="btn btn-success col-2 ml-4">Mr.Sandeep</Link><br></br><br></br>
                </div>
            </form>
        <Footer/>
        </div>
    );
}

export default QuectionTeacher;
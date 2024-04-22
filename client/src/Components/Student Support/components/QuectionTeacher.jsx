import React from "react";
import { Link } from "react-router-dom";

function QuectionTeacher() {
    return (
           
        <div>
        
            <form>
            <br/><br/>
            <h1>Select Your Teacher</h1>

            <Link to="/question" className="btn btn-success">Mr.Nandana</Link><br></br><br></br>
 
            <Link to="/question1" className="btn btn-success">Mr.Prabath</Link><br></br><br></br>

            <Link to="/question2" className="btn btn-success">Mr.Sandeep</Link><br></br><br></br>
            </form>
        </div>
      
    );
}

export default QuectionTeacher;
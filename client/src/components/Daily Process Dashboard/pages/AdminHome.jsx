import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return(
        <div className="text-center mt-5">
            <h1>Daily Process Dashboard</h1>
            <Link className='btn' to={'/adminDetails'}>Admin Table</Link>
        </div>
    );
};

export default Home;
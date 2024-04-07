import React from "react";
import { Link } from "react-router-dom";

import AdminHeader from '../components/AdminHeader'

const AdminHome = () => {
    return(
        <div>
        <AdminHeader />
            <div className="text-center mt-5">
                <h1>Daily Process Dashboard</h1>
                <Link className='btn' to={'/adminDetails'}>Admin Table</Link>
            </div>
        </div>
    );
};

export default AdminHome;
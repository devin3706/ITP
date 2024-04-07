import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//api functions
import { adminById, update } from "../api/admin";


const AdminEdit = () => {
    //password validations
    //let hasSixChar = newPassword.length >= 6;

    const { adminID } = useParams();
    const navigate = useNavigate();

    // Form states
    const [adminDetails, setAdminDetails] = useState({
        fName: '',
        lName: '',
        username: '',
        email: '',
        contact: '',
    });
    

    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const { admin } = await adminById(adminID);
                setAdminDetails(admin);
            } catch (error) {
                console.error('Failed to fetch admin details:', error.message);
            }
        };
        fetchAdminDetails();
    }, [adminID]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdminDetails({ ...adminDetails, [name]: value });
    };

    const handleFormSubmit = async () => {
        try {
            const res = await update(adminID, adminDetails);
            console.log(res);
            alert("Successfully updated details!");
            navigate("/adminDetails");

        } catch (error) {
            console.error("Failed to update admin details:", error.message);
            alert("Failed to update admin details!");
        }
    };

    const handleCancel = async () => {
        navigate("/adminDetails");
    }

    return(
        <div className="container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-5">
            <div className="text-center mb-5 alert alert-dark">
                <label htmlFor="" className="h2">Edit Admin</label>
            </div>

            <div className="alert alert-success">

                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="fName"
                        placeholder="First Name"
                        value={adminDetails.fName}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        className="form-control mt-3"
                        name="lName"
                        placeholder="Last Name"
                        value={adminDetails.lName}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        className="form-control mt-3"
                        name="username"
                        placeholder="Username"
                        value={adminDetails.username}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        className="form-control mt-3"
                        name="email"
                        placeholder="Email"
                        value={adminDetails.email}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        className="form-control mt-3"
                        name="contact"
                        placeholder="Contact"
                        value={adminDetails.contact}
                        onChange={handleChange}
                    />
                </div>

                <div className="text-center mt-4">
                    <button
                        className="btn btn-outline-danger btn-sm"
                        type="button"
                        onClick={handleCancel}
                    >
                        CANCEL
                    </button>
                    <span className="p-5"></span>
                    <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        disabled={
                            !adminDetails.fName
                            || !adminDetails.lName
                            || !adminDetails.username
                            || !adminDetails.email
                            || !adminDetails.contact
                            || !(adminDetails.contact.length === 10)
                            || !(adminDetails.contact.indexOf("07") === 0)
                        }
                        onClick={handleFormSubmit}
                    >
                        Confirm Changes
                    </button>
                    
                </div>

            </div>

        </div>
    ); 
};

export default AdminEdit;
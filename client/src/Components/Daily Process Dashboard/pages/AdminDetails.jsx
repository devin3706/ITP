import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// api functions
import { view, deleteAdmin, update } from "../api/admin";

//header and footer
import Header from "../../Exam Platform and Leaderboard/components/Header";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";

const AdminDetails = () => {
    const [admins, setAdmins] = useState([]);
    const [editAdminID, setEditAdminID] = useState(null);

    // Fetch admins
    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const res = await view();
                setAdmins(res.admins);
            } catch (error) {
                console.error("Failed to fetch admins:", error.message);
            }
        };
        fetchAdmins();
    }, []);

    const handleEdit = (adminID) => {
        setEditAdminID(adminID);
    };

    const handleSave = async (adminID) => {
        try {
            // Find the admin being edited in the admins array
            const adminToUpdate = admins.find((admin) => admin._id === adminID);
            if (!adminToUpdate) {
                console.error("Admin not found for update");
                return;
            }

            // Update admin in the backend
            await update(adminID, adminToUpdate);

            // Clear edit mode
            setEditAdminID(null);
            alert("Admin details updated successfully!");
        } catch (error) {
            console.error("Failed to update admin details:", error.message);
            alert("Failed to update admin details");
        }
    };

    const handleDeleteAdmin = async (adminID) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this admin account?");
        if (confirmDelete) {
            try {
                await deleteAdmin(adminID);
                setAdmins(admins.filter((admin) => admin._id !== adminID));
                alert("Admin account deleted successfully");
            } catch (error) {
                console.error("Failed to delete admin account:", error.message);
                alert("Failed to delete admin account");
            }
        }
    };

    const handleInputChange = (e, adminID, field) => {
        const updatedAdmins = admins.map((admin) => {
            if (admin._id === adminID) {
                return { ...admin, [field]: e.target.value };
            }
            return admin;
        });
        setAdmins(updatedAdmins);
    };

    return (
        <div style={{backgroundColor: '#ECF0F5'}} className="vh-100">
        <Header/>
        <div className="container mt-4">
            <h1 className="text-center mt-3 mb-4 alert alert-dark border border-dark shadow" style={{fontSize: '300%'}}>Admin Details</h1>

            <div className="row">
                <div className="d-flex justify-content-start col">
                    <Link to="/adminHome">                                
                        <button className="btn btn-info rounded-5 mt-4 mb-3">dashboard</button>                                
                    </Link>
                </div>

                <div className="d-flex justify-content-end col">
                    <Link to="/adminCreate">                                
                        <button className="btn btn-primary rounded-5 mt-4 mb-3">+ new admin</button>                                
                    </Link>
                </div>
            </div>

            <table className="table table-striped table-bordered table-light text-center shadow">
                <thead>
                    <tr className="table-dark text-dark">
                        <th className="w-1 fw-bold text-dark">#</th>
                        <th className="w-15 fw-bold text-dark">First Name</th>
                        <th className="w-15 fw-bold text-dark">Last Name</th>
                        <th className="w-10 fw-bold text-dark">Username</th>
                        <th className="w-15 fw-bold text-dark">Email</th>
                        <th className="w-20 fw-bold text-dark">Contact</th>
                        <th className="w-25 fw-bold text-dark">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                {editAdminID === admin._id ? (
                                    <input
                                        type="text"
                                        className="w-100"
                                        value={admin.fName}
                                        onChange={(e) => handleInputChange(e, admin._id, "fName")}
                                    />
                                ) : (
                                    admin.fName
                                )}
                            </td>
                            <td>
                                {editAdminID === admin._id ? (
                                    <input
                                        type="text"
                                        className="w-100"
                                        value={admin.lName}
                                        onChange={(e) => handleInputChange(e, admin._id, "lName")}
                                    />
                                ) : (
                                    admin.lName
                                )}
                            </td>
                            <td>
                                {editAdminID === admin._id ? (
                                    <input
                                        type="text"
                                        className="w-100"
                                        value={admin.username}
                                        onChange={(e) => handleInputChange(e, admin._id, "username")}
                                    />
                                ) : (
                                    admin.username
                                )}
                            </td>
                            <td>
                                {editAdminID === admin._id ? (
                                    <input
                                        type="email"
                                        className="w-100"
                                        value={admin.email}
                                        onChange={(e) => handleInputChange(e, admin._id, "email")}
                                    />
                                ) : (
                                    admin.email
                                )}
                            </td>
                            <td>+94 <span className="p-1"></span>
                                {editAdminID === admin._id ? (
                                    <input
                                        type="number"
                                        className="w-60"
                                        value={admin.contact}
                                        onChange={(e) => handleInputChange(e, admin._id, "contact")}
                                    />
                                ) : (
                                    admin.contact
                                )}
                            </td>
                            <td>
                                {editAdminID === admin._id ? (
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleSave(admin._id)}
                                        disabled={
                                            !admin.fName
                                            || !admin.lName
                                            || !admin.username
                                            || !admin.email
                                            || !admin.contact
                                            || !(admin.contact >= 700000000)
                                            || !(admin.contact <= 799999999)
                                            || !(admin.contact.toString().length === 9)

                                        }
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-info btn-sm ml-3"
                                        onClick={() => handleEdit(admin._id)}
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDeleteAdmin(admin._id)}
                                    className="btn btn-danger btn-sm ml-3"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <Footer/>
    </div>
    );
};

export default AdminDetails;

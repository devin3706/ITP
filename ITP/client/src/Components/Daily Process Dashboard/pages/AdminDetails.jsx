import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../../styles.css';

// api functions
import { view, deleteAdmin, update, logout } from "../api/admin";

//header and footer
import Header from "../../Exam Platform and Leaderboard/components/Header";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import { PiUserCircle } from "react-icons/pi";

//validations
const isValidContact = (contact) => contact >= 700000000 && contact <= 799999999 && contact.toString().length === 9;
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


const AdminDetails = () => {
    const [admins, setAdmins] = useState([]);
    const [editAdminID, setEditAdminID] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchField, setSearchField] = useState("username");

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

            const validEmail = isValidEmail(adminToUpdate.email);
            const validContact = isValidContact(adminToUpdate.contact);

            if (!validEmail || !validContact) {
                alert("Invalid email or contact number");
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

    const filteredAdmins = admins.filter((admin) =>
        admin[searchField].toLowerCase().includes(searchTerm.toLowerCase())
    );

    //logout
    const navigate = useNavigate();

    const handleAdminLogout = async(e) => {
        e.preventDefault();

        logout()
            .then((res) => {
                alert(res.message);

                document.cookie = 'adminUsername=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                
                //redirect to login page
                navigate("/adminLogin");

        }).catch(err => console.error(err));
    }

    return (
        <div style={{backgroundColor: '#ECF0F5'}} className="vh-100">
        <Header/>
        <div className="headerBtns">
            <button className="btn btn-grey fs-6" onClick={handleAdminLogout}>Log out</button>
            <Link to="/adminProfile">
                <PiUserCircle className="text-white ml-3" style={{fontSize: '70px'}}/>
            </Link>
        </div>
        <div className="container mt-4">
            <h1 className="text-center mt-3 mb-4 alert alert-dark border border-dark shadow" style={{fontSize: '300%'}}>Admin Details</h1>

            <div className="row">
                <div className="d-flex justify-content-start col">
                    <Link to="/adminHome">                                
                        <button className="btn btn-info rounded-5 mt-4 mb-3">dashboard</button>                                
                    </Link>
                </div>

                <div className="d-flex justify-content-between mt-3 col-8">
                    <input
                        type="text"
                        className="w-100 form-control shadow rounded-5"
                        placeholder="Search by username"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="form-control w-auto text-light shadow rounded-5 ml-2"
                        style={{backgroundColor: '#494949'}}
                        value={searchField}
                        onChange={(e) => setSearchField(e.target.value)}
                    >
                        <option value="username">Username</option>
                        <option value="fName">First Name</option>
                        <option value="lName">Last Name</option>
                    </select>
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
                    {filteredAdmins.map((admin, index) => (
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

                                        }
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-info btn-sm ml-3 rounded-5"
                                        onClick={() => handleEdit(admin._id)}
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDeleteAdmin(admin._id)}
                                    className="btn btn-danger btn-sm ml-3 rounded-5"
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

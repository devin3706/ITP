// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// //api functions
// import { view, deleteAdmin } from "../api/admin";

// const AdminDetails = () => {
//     const [admins, setAdmins] = useState([]);
//     const navigate = useNavigate();

//     // Fetch admins
//     useEffect(() => {
//         const fetchAdmins = async () => {
//             try {
//                 const res = await view();
//                 setAdmins(res.admins);
//             } catch (error) {
//                 console.error("Failed to fetch admins:", error.message);
//             }
//         };
//         fetchAdmins();
//     }, []);

//     const handleEditDetails = (adminID) => {

//         navigate(`/adminEdit/${adminID}`);
//     };

//     const handleDeleteAdmin = async (adminID) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this admin account?");
//         if (confirmDelete) {
//             try {
//                 await deleteAdmin(adminID);
//                 setAdmins(admins.filter(admin => admin._id !== adminID));
//                 alert("Admin account deleted successfully");
//             } catch (error) {
//                 console.error("Failed to delete admin account:", error.message);
//                 alert("Failed to delete admin account");
//             }
//         }
//     };

//     var num = 0;

//     return (
//         <div className="container mt-5 text-center">
//             <h1 className="text-center mb-4">Admin Details</h1>
//             <table className="table table-striped table-bordered table-success">
//                 <thead>
//                     <tr className="table-primary">
//                         <th>#</th>
//                         <th className="col-2">First Name</th>
//                         <th className="col-2">Last Name</th>
//                         <th className="col-2">Username</th>
//                         <th className="col-2">Email</th>
//                         <th className="col-2">Contact</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {admins.map((admin, index) => (
//                         <tr key={index}>
//                             <td>{++num}</td>
//                             <td>{admin.fName}</td>
//                             <td>{admin.lName}</td>
//                             <td>{admin.username}</td>
//                             <td>{admin.email}</td>
//                             <td>0{admin.contact}</td>
//                             <td>
//                                 <button
//                                     onClick={() => handleEditDetails(admin._id)}
//                                     className="btn btn-outline-primary btn-sm"
//                                 >
//                                     Edit
//                                 </button>
//                                 <span className="p-2"></span>
//                                 <button
//                                     onClick={() => handleDeleteAdmin(admin._id)}
//                                     className="btn btn-outline-danger btn-sm"
//                                 >
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AdminDetails;


import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";

// api functions
import { view, deleteAdmin, update } from "../api/admin";

import AdminHeader from '../components/AdminHeader'

const AdminDetails = () => {
    const [admins, setAdmins] = useState([]);
    const [editAdminID, setEditAdminID] = useState(null); // State to track the admin being edited
    //const navigate = useNavigate();

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
        <div>
        <AdminHeader />
        <div className="container mt-5 text-center">
            <h1 className="text-center mb-4">Admin Details</h1>
            <table className="table table-striped table-bordered table-success">
                <thead>
                    <tr className="table-primary">
                        <th>#</th>
                        <th className="col">First Name</th>
                        <th className="col">Last Name</th>
                        <th className="col">Username</th>
                        <th className="col">Email</th>
                        <th className="col">Contact</th>
                        <th>Action</th>
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
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => handleEdit(admin._id)}
                                    >
                                        Edit
                                    </button>
                                )}
                                <span className="p-2"></span>
                                <button
                                    onClick={() => handleDeleteAdmin(admin._id)}
                                    className="btn btn-outline-danger btn-sm"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    </div>
    );
};

export default AdminDetails;

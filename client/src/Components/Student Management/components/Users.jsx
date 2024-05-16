import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";

function Users () {
    const [users, setUsers] = useState([{
        name: "Minsi" , email: "minsi@gmail.com", school: "Minsi" 
    }]);
    const [searchInput, setSearchInput] = useState("");
    const [originalUsers, setOriginalUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/student')
        .then(result => {
            setUsers(result.data);
            setOriginalUsers(result.data); // Set original users when fetching
        })
        .catch(err => console.log(err))
    },[]);

    const handleDelete = (id) => {
        axios.delete (`http://localhost:8081/student/deleteUser/${id}`)
        .then (res => {
            console.log (res);
            window.location.reload();
        })
        .catch (err => console.log(err));
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
    
        if (searchInput.trim() === "") {
            // If search input is empty, restore original list of users
            setUsers(originalUsers);
        } else {
            // Otherwise, filter the users based on the search input
            const newSearchUsers = originalUsers.filter((user) =>
                user.name.toLowerCase().includes(searchInput.toLowerCase())
            );
    
            setUsers(newSearchUsers);
        }
    };

    return (
        <div style={{backgroundColor: '#ECF0F5'}}>
            <Header />
        <div className="d-flex mt-5 mb-5 vh-200 justify-content-center align-items-center">
            <div className='w-75 bg-white rounded-3 p-3' style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', overflowX: 'auto' }}>
                <Link to="/createStudent" className='btn btn-primary mr-2'> Add + </Link> 
                <form className="d-flex" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        name="searchInput"
                        id="searchInput"
                        className="form-control my-2"
                        placeholder="Search User"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button type="submit" className="btn btn-secondary mx-2">Search</button>
                </form>
                <table className='table table-hover mt-3'>
                    <thead>
                        <tr>
                            <th> Name </th>
                            <th> Email </th>
                            <th> School</th>
                            <th> Contact Number</th>
                            <th> Address </th>
                            <th> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td> {user.name} </td>
                                    <td> {user.email}  </td>
                                    <td>{user.school}  </td>
                                    <td>{user.number}  </td>
                                    <td>{user.address}  </td>
                                    <td>
                                        <Link to={`/updateStudent/${user._id}`} className='btn btn-primary mr-2'> Update</Link> 
                                        <button className='btn btn-danger' onClick={() => handleDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div> 
        </div>
        <Footer />
        </div>
    );
} 

export default Users;
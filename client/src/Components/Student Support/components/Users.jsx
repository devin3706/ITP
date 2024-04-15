/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:8081/users';
  
    axios.get(apiUrl)
      .then(result => {
        setUsers(result.data);
        console.log("Users fetched successfully:", result.data);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        console.error("Request URL:", apiUrl);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/users/deleteUser/${id}`)
      .then(res => {
        console.log("User deleted successfully:", res.data);
        // Update the users state by filtering out the deleted user
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
      })
      .catch(error => {
        console.log("Error deleting user:", error);
        // Display a user-friendly message to the user, e.g., show an error toast
      });
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<span key={i}>&#9733;</span>); // Always render full stars
    }
    return stars;
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <div className="mb-3">
          <Link to="/create" className="btn btn-success">Add +</Link>
          <Link to="/questionTeacher" className="btn btn-success ms-2">Questions</Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>StudentId</th>
              <th>Teacher</th>
              <th>Feedback</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.Name}</td>
                <td>{user.StudentId}</td>
                <td>{user.Teacher}</td>
                <td>{user.Feedback}</td>
                <td>{renderStars(user.Rating)}</td>
                <td>
                  <Link to={`/update/${user._id}`} className="btn btn-success me-2">Update</Link>
                  <button onClick={() => handleDelete(user._id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
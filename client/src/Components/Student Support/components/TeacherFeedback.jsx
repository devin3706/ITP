import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function TeacherFeedback() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

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

  const renderStars = (rating) => {
    const stars = [];
    const filledStars = Math.floor(rating);

    for (let i = 1; i <= 5; i++) {
      if (i <= filledStars) {
        stars.push(<span key={i}>&#9733;</span>);
      } else {
        stars.push(<span key={i}>&#9734;</span>);
      }
    }

    return stars;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Perform search/filter logic here
    // For simplicity, let's filter users by their Teacher name
    const filteredUsers = users.filter(user =>
      user.Teacher.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  return (
    <div className="container-fluid">
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-100 bg-white rounded p-3">
          <form onSubmit={handleSearchSubmit} className="mb-3">
            <input
              type="text"
              placeholder="Search by Teacher Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
            />
            <button type="submit" className="btn btn-primary mt-2">Search</button>
          </form>
          
          <div className="table-responsive" style={{ maxHeight: "200vh", overflowY: "auto" }}>
            <table className="table table-striped">
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.Email}</td>
                    <td>{user.Teacher}</td>
                    <td>{user.Feedback}</td>
                    <td>{renderStars(user.Rating)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="5" className="text-end">
                    {/* Footer content here */}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherFeedback;
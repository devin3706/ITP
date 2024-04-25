import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function StudentFeedback() {
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = 'http://localhost:8081/users';
        const url = searchInput ? `${apiUrl}?search=${searchInput}` : apiUrl;
        const response = await axios.get(url);
        setFilteredUsers(response.data); // Update filteredUsers with fetched data
        console.log("Users fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setFilteredUsers([]); // Reset filteredUsers in case of error
      }
    };

    fetchData();
  }, [searchInput]);

  const handleSearch = async () => {
    try {
      const apiUrl = 'http://localhost:8081/users';
      const url = searchInput ? `${apiUrl}?search=${searchInput}` : apiUrl;
      const response = await axios.get(url);
      setFilteredUsers(response.data); // Update filteredUsers with search results
      console.log("Filtered users fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching filtered users:", error);
      setFilteredUsers([]); // Reset filteredUsers in case of error
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/users/delete/${id}`);
      setFilteredUsers(prevUsers => prevUsers.filter((user) => user._id !== id));
      console.log(`User with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const filledStars = Math.floor(rating);

    for (let i = 1; i <= 5; i++) {
      if (i <= filledStars) {
        stars.push(<span key={i}>&#9733;</span>); // Filled star
      } else {
        stars.push(<span key={i}>&#9734;</span>); // Empty star
      }
    }

    return stars;
  };

  return (
    <div className="container mt-4">
      <div className="mb-3 d-flex">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by Teacher Name"
          className="form-control me-2"
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      <div className="row">
        {filteredUsers.map((user) => (
          <div key={user._id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Student Feedback</h5>
                <p className="card-text">Teacher: {user.Teacher}</p>
                <p className="card-text">Feedback: {user.Feedback}</p>
                <p className="card-text">Rating: {renderStars(user.Rating)}</p>
                <div className="d-flex justify-content-between">
                  <Link to={`/update/${user._id}`} className="btn btn-success me-2">
                    Update
                  </Link>
                  <button onClick={() => handleDelete(user._id)} className="btn btn-danger">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-md-12 mt-3">
          <Link to="/create" className="btn btn-primary">
            Add your feedback
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentFeedback;

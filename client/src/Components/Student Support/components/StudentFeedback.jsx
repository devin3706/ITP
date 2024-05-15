import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";

function StudentFeedback() {
  const [searchInput, setSearchInput] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/users');
        setUsers(response.data);
        setFilteredUsers(response.data);
        console.log("Users fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
        setFilteredUsers([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchInput.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => user.Teacher.toLowerCase().includes(searchInput.toLowerCase()));
      setFilteredUsers(filtered);
    }
  }, [searchInput, users]);

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
    <div style={{ backgroundColor: '#ECF0F5'}}>
      <Header/>
      <div className="headerBtns">
          <Link to='/dashboard' className="btn btn-grey fs-6">Dashboard</Link>
      </div>
      <b><h1 className="card-title text-center mb-4">Feedback Page</h1></b>
      <div className="container mt-5 mb-5">
      <div className="row">
          <div className="col-md-12 mt-3">
            <Link to="/create" className="btn btn-primary">
              Add your feedback
            </Link>
          </div>
        </div>
        <br></br>
        <div className="mb-3 d-flex">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by Teacher Name"
            className="form-control h-100 me-2 shadow"
          />
          <button className="btn btn-secondary" onClick={() => setSearchInput("")}>
            search
          </button>
        </div>
       
        <div className="row">
          {filteredUsers.map((user) => (
            <div key={user._id} className="col-md-6 mb-4">
              <div className="card shadow">
                <div className="card-body">
                  <p className="card-text">Teacher: {user.Teacher}</p>
                  <p className="card-text">Feedback: {user.Feedback}</p>
                  <p className="card-text">Rating: {renderStars(user.Rating)}</p>
                  <div className="d-flex justify-content-between">
                    <Link to={`/update/${user._id}`} className="btn btn-primary">
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
      </div>
      <Footer/>
    </div>
  );
}

export default StudentFeedback;

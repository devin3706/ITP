import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../Exam Platform and Leaderboard/components/Header";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";

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
    axios.delete(`http://localhost:8081/users/delete/${id}`)
      .then(res => {
        console.log("User deleted successfully:", res.data);
        // Update the users state by filtering out the deleted user
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
      })
      .catch(error => {
        console.log("Error deleting user:", error);
        // Display a user-friendly message to the user, e.g., show an error toast
      });
  };

  const renderStars = (rating) => {
    const stars = [];
    const filledStars = Math.floor(rating); // Determine the number of filled stars

    for (let i = 1; i <= 5; i++) {
      if (i <= filledStars) {
        stars.push(<span key={i}>&#9733;</span>); // Render a filled star
      } else {
        stars.push(<span key={i}>&#9734;</span>); // Render an empty star
      }
    }

    return stars;
  };

  return (
    <div style={{ backgroundColor: '#ECF0F5'}}>
      <Header/>
      <div className="mt-10 mb-10">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="bg-white shadow rounded-3 p-4">
              <div className="row justify-content-center mb-4">
              <h1 className="card-title text-center mb-4">Feedback Page</h1>
                  <Link to="/studentFeedback" className="col-2 btn btn-success me-3 cardHov">Student Feedback</Link>
                  <Link to="/teacherFeedback" className="col-2 btn btn-success me-3 cardHov">Teacher Feedback</Link>
                  <Link to="/inquiry" className="col-2 btn btn-success me-3 cardHov">Display Questions</Link>
                
              </div>
              <div className="table-responsive" style={{ maxHeight: "80vh", overflowY: "auto" }}>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th className="col-2">Name</th>
                      <th className="col-2">Email</th>
                      <th className="col-1">Teacher</th>
                      <th className="col-5">Feedback</th>
                      <th className="col-1">Rating</th>
                      <th className="col-1">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.Name}</td>
                        <td>{user.Email}</td>
                        <td>{user.Teacher}</td>
                        <td>{user.Feedback}</td>
                        <td>{renderStars(user.Rating)}</td>
                        <td>
                            <button onClick={() => handleDelete(user._id)} className="btn btn-danger">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Users;
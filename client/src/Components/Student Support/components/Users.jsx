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
    <div className="container mt-15">
      <div className="row justify-content-center">
        <div className="col-lg-25">
          <div className="bg-white rounded p-80">
            <div className="mb-3">
              <Link to="/studentFeedback" className="btn btn-success ms-3">Student Feedback</Link>
              <Link to="/teacherFeedback" className="btn btn-success ms-3">Teacher Feedback</Link>
              <Link to="/inquiry" className="btn btn-success ms-3">Display Questions</Link>
              <Link to="/createInquiry" className="btn btn-success ms-3">Create Questions</Link>
              <Link to="/updateInquiry" className="btn btn-success ms-3">Update Questions</Link>
            </div>
            <div className="table-responsive" style={{ maxHeight: "80vh", overflowY: "auto" }}>
              <table className="table table-striped">
                <thead>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Teacher</td>
                  <td>Feedback</td>
                  <td>Rating</td>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      
                      <td> {user.Name}</td>
                    
                    
                      <td>S {user.Email}</td>
                    
                    
                      <td>{user.Teacher}</td>
                    
                      <td> {user.Feedback}</td>
                    
                      <td>{renderStars(user.Rating)}</td>
                   
                      <td>
                        <button onClick={() => handleDelete(user._id)} className="btn btn-danger">Delete</button>
                      </td>
                    
                    <tr>
                      <td><hr /></td>
                    </tr>
                    </tr>

                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Users;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Inquiry() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:8081/inquiry';

    axios.get(apiUrl)
      .then(result => {
        setInquiries(result.data);
        console.log("Inquiries fetched successfully:", result.data);
      })
      .catch(error => {
        console.error("Error fetching inquiries:", error);
        console.error("Request URL:", apiUrl);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/inquiry/delete/${id}`)
      .then(res => {
        console.log("Inquiry deleted successfully:", res.data);
        // Update the inquiries state by filtering out the deleted inquiry
        setInquiries(prevInquiries => prevInquiries.filter(inquiry => inquiry._id !== id));
      })
      .catch(error => {
        console.log("Error deleting inquiry:", error);
        // Display a user-friendly message to the user, e.g., show an error toast
      });
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Inquiries</h3>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Teacher</th>
                      <th>Class</th>
                      <th>Question</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inquiry) => (
                      <tr key={inquiry._id}>
                        <td>{inquiry.Email}</td>
                        <td>{inquiry.Teacher}</td>
                        <td>{inquiry.Class}</td>
                        <td>{inquiry.Question}</td>
                        <td>
                          <button onClick={() => handleDelete(inquiry._id)} className="btn btn-danger btn-sm">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-center mt-4">
                <Link to="/createInquiry" className="btn btn-success">Add Your Question</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inquiry;

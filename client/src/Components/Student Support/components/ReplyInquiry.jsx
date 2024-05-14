import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ReplyInquiry() {
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
    axios.delete(`http://localhost:8081/inquiry/deleteInquiry/${id}`)
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
    <div className="container-fluid h-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-lg-8"> {/* Adjust the column width based on your layout */}
          <div className="bg-white rounded p-3 h-100">
            <div className="mb-3">
              {/* Content before the table */}
            </div>
            <div className="table-responsive" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
              {/* Adjust the maxHeight as per your requirement */}
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Email</th>
                    <th scope="col">Teacher</th>
                    <th scope="col">Class</th>
                    <th scope="col">Question</th>
                    <th scope="col">Action</th>
                    <th scope="col">Reply</th> {/* New column for reply */}
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
                        <button onClick={() => handleDelete(inquiry._id)} className="btn btn-primary me-2">Reply</button>
                      </td>
                      <td>
                        <div className="d-flex">
                          <input type="text" className="form-control" placeholder="Enter your reply" />
                        </div>
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
  );
}

export default ReplyInquiry;

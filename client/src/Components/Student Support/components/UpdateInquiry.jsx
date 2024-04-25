import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function UpdateInquiry() {
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
    <div className="col-lg-8">
      <div className="container-fluid">
        <div className="d-flex vh-100 bg-primary row justify-content-center align-items-center">
          <div className="w-50 bg-white rounded p-3">
            <div className="mb-3">
              {/* Content before the table */}
            </div>
            <div className="table-responsive" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <table className="table table-striped">
                <thead>
                  
                </thead>
                <tbody>
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry._id}>
                      <td>{inquiry.Email}</td>
                      <td>{inquiry.Teacher}</td>
                      <td>{inquiry.Class}</td>
                      <td>{inquiry.Quection}</td>
                      <td>
                        <button onClick={() => handleDelete(inquiry._id)} className="btn btn-danger">Delete</button>
                       
                      </td>
                    </tr>
                  ))}
                </tbody>
                <Link to="/createInquiry" className="btn btn-success">Add your question</Link>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateInquiry;
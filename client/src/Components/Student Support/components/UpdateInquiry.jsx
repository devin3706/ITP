import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../Exam Platform and Leaderboard/components/Header";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";

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
<<<<<<< Updated upstream
    <div style={{ backgroundColor: '#ECF0F5'}}>
      <Header/>
        <div className="d-flex mt-10 mb-10 row justify-content-center align-items-center">
          <div className="col-8 bg-white rounded p-3">
=======
    <div className="container-fluid h-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-lg-8"> {/* Adjust the column width based on your layout */}
          <div className="bg-white rounded p-3 h-100">
>>>>>>> Stashed changes
            <div className="mb-3">
              {/* Content before the table */}
            </div>
            <div className="table-responsive" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
              {/* Adjust the maxHeight as per your requirement */}
              <table className="table table-striped">
<<<<<<< Updated upstream
                <thead>
                                 
=======
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Email</th>
                    <th scope="col">Teacher</th>
                    <th scope="col">Class</th>
                    <th scope="col">Question</th>
                    <th scope="col">Action</th>
                  </tr>
>>>>>>> Stashed changes
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      <Footer/>
    </div>
  );
}

export default UpdateInquiry;

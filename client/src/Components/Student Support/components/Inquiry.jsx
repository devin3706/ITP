import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";

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
    <div style={{ backgroundColor: '#ECF0F5'}}>
      <Header/>
      <div className="mt-10 mb-10">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card">
              <div className="card-body  shadow">
                <h1 className="card-title text-center mb-4">Ask Your Questions</h1>
                <div className="text-center mt-4">
                  <Link to="/createInquiry" className="btn btn-primary">Add Your Question</Link>
                </div>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th className="col-2">Email</th>
                        <th className="col-1">Teacher</th>
                        <th className="col-1">Class</th>
                        <th className="col-5">Question</th>
                        <th className="col-1">Action</th>
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Inquiry;

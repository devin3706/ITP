import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";
import "./styles.css";
import jsPDF from "jspdf";

function Payments() {
  const [workouts, setWorkouts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSlip, setSelectedSlip] = useState(null); // State to track selected slip
  const navigate = useNavigate();

  useEffect(() => {
    function readWorkouts() {
      axios
        .get("http://localhost:8081/payments/read")
        .then((res) => {
          setWorkouts(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    readWorkouts();
  }, []);

  function handleDelete(Workoutid) {
    axios
      .delete(`http://localhost:8081/payments/delete/${Workoutid}`)
      .then(() => {
        alert("Delete successful.");
        navigate("/payment");
      })
      .catch((err) => {
        alert("couldn't delete the workout.", err);
      });
  }

  const filteredWorkouts = workouts.filter((workout) =>
    Object.values(workout).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Function to handle click on View Slip button
  const handleViewSlip = (slipUrl) => {
    setSelectedSlip(slipUrl); // Set selected slip URL to show in popup
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setSelectedSlip(null); // Reset selected slip URL to close the popup
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 255); // Blue color
    doc.text("Payment Details", 10, 20); // Heading
    doc.setTextColor(0); // Reset text color to black
    let y = 30; // Initial Y position
    filteredWorkouts.forEach((workout, index) => {
      // Add background colors to alternate rows
      if (index % 2 === 0) {
        doc.setFillColor(211, 211, 211); // Grey color
      } else {
        doc.setFillColor(255, 255, 255);
      }
      doc.rect(0, y - 5, 220, 50, "F"); // Draw rectangle behind each row

      // Add data to PDF
      doc.setFontSize(12);
      doc.setTextColor(0); // Set text color to black
      doc.text(`Student Name: ${workout.studentName}`, 10, y);
      doc.text(`Course: ${workout.course}`, 10, y + 10);
      doc.text(`Contact No: ${workout.contactNumber}`, 10, y + 20);
      doc.text(`Address: ${workout.address}`, 10, y + 30);
      doc.text(`Email: ${workout.email}`, 10, y + 40);
      y += 60; // Increment Y position for next entry
    });
    doc.save("workoutDetails.pdf"); // Save PDF
  };

  return (
    <div style={{ backgroundColor: "#ECF0F5" }}>
      <Header />
      <div className="fullDiv m-5">
        <button className="btn btn-primary" onClick={generatePDF}>
          Generate PDF
        </button>
        <div className="mt-5 mb-5">
          <input
            type="text"
            placeholder="Search by"
            className="form-control shadow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="row">
          {filteredWorkouts.map((workout) => (
            <div className="col-md-6 p-4" key={workout._id}>
              <div
                className="card-block p-4 shadow rounded-3 text-start text-primary"
                style={{ backgroundColor: "#05242a" }}
              >
                <div className="row">
                  <div className="col-md-6">
                    <br />
                    <label>Student Name</label>
                    <input
                      value={workout.studentName}
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <br />
                    <label>Course</label>
                    <input
                      value={workout.course}
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <br />
                    <label>Contact No</label>
                    <input
                      value={workout.contactNumber}
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <br />
                    <label>Address</label>
                    <input
                      value={workout.address}
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <br />
                    <label>E-mail</label>
                    <input
                      value={workout.email}
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <br />
                    <label>Image</label>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleViewSlip(`http://localhost:8081/${workout.slip}`)
                      }
                    >
                      View Slip
                    </button>
                  </div>
                  <div className="mt-3">
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-danger"
                        onClick={(d) => handleDelete(workout._id)}
                      >
                        Delete
                      </button>

                      <Link to={`/editpayments/${workout._id}`}>
                        <input
                          type="button"
                          className="btn btn-success"
                          value="Update"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedSlip && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
            <img src={selectedSlip} alt="slip" />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Payments;

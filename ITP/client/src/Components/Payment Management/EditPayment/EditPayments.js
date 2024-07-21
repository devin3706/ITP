import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";

function EditPayments() {
  const { Workoutid } = useParams();
  console.log("Workout id :", Workoutid);

  const navigate = useNavigate();

  const [studentName, setUpdateStudentName] = useState("");
  const [course, setUpdateCourse] = useState("");
  const [contactNumber, setUpdateContactNumber] = useState(0);
  const [address, setUpdateAddress] = useState("");
  const [email, setUpdateEmail] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8081/payments/get/${Workoutid}`)
      .then((res) => {
        console.log(res.data);
        setUpdateStudentName(res.data.studentName);
        setUpdateCourse(res.data.course);
        setUpdateContactNumber(res.data.contactNumber);
        setUpdateAddress(res.data.address);
        setUpdateEmail(res.data.email);
      })
      .catch((err) => {
        alert("wda na", err);
      });
  }, [Workoutid]);

  const editPayments = (e) => {
    e.preventDefault();

    const updateWorkout = {
      studentName,
      course,
      contactNumber,
      address,
      email,
    };

    axios
      .put(`http://localhost:8081/payments/update/${Workoutid}`, updateWorkout)
      .then((result) => {
        console.log(result);
        alert("updated successfully.");
        navigate("/paymentdetails");
      })
      .catch((err) => {
        console.error("Error updating workout:", err);
        alert("Failed to update workout. Check console for details.");
      });

    console.log("Update Payload:", updateWorkout);
  };

  return (
    <div style={{ backgroundColor: '#ECF0F5'}}>
      <Header/>
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="bg-dark text-white shadow rounded-4 p-4">
              <h1 className="text-warning mb-4">Edit Payment</h1>
              <form onSubmit={editPayments}>
                <div className="text-warning">
                  <div className="mb-3">
                    <label htmlFor="studentName" className="form-label">Student Name:</label>
                    <input
                      type="text"
                      id="studentName"
                      name="studentName"
                      value={studentName}
                      onChange={(e) => setUpdateStudentName(e.target.value)}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="course" className="form-label">Select Course:</label>
                    <select
                      id="course"
                      name="course"
                      value={course}
                      onChange={(e) => setUpdateCourse(e.target.value)}
                      className="form-select"
                      required
                    >
                      <option value="">Select Course</option>
                      <option value="A/L">Advance Level(A/L)</option>
                      <option value="O/L">Ordinary Level(O/L)</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contactNumber" className="form-label">Contact No:</label>
                    <input
                      type="text"
                      id="contactNumber"
                      name="contactNumber"
                      value={contactNumber}
                      onChange={(e) => setUpdateContactNumber(e.target.value)}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address:</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={address}
                      onChange={(e) => setUpdateAddress(e.target.value)}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">E-mail:</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={email}
                      placeholder="Example@address.com"
                      onChange={(e) => setUpdateEmail(e.target.value)}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-warning">Update</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default EditPayments;

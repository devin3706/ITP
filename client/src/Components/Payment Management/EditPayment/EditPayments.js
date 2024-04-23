import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Exam Platform and Leaderboard/components/Header";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";

function EditPayments() {
  const { Workoutid } = useParams();
  console.log("Workout id :", Workoutid);

  const navigate = useNavigate();

  const [studentName, setUpdateStudentName] = useState("");
  const [course, setUpdateCourse] = useState("");
  const [sid, setUpdateSid] = useState("");
  const [contactNumber, setUpdateContactNumber] = useState(0);
  const [address, setUpdateAddress] = useState("");
  const [email, setUpdateEmail] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/workouts/get/${Workoutid}`)
      .then((res) => {
        console.log(res.data);
        setUpdateStudentName(res.data.studentName);
        setUpdateCourse(res.data.course);
        setUpdateSid(res.data.sid);
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
      sid,
      contactNumber,
      address,
      email,
    };

    axios
      .put(`http://localhost:4000/workouts/update/${Workoutid}`, updateWorkout)
      .then((result) => {
        console.log(result);
        alert("payment updated successfully.");
        navigate("/paymentdetails");
      })
      .catch((err) => {
        console.error("Error updating workout:", err);
        alert("Failed to update workout. Check console for details.");
      });

    console.log("Update Payload:", updateWorkout);
  };

  return (
    <div className="vh-100" style={{backgroundColor: '#ECF0F5'}}>
      <Header/>
      <div className="fullDiv m-5 p-4 bg-dark text-white rounded-4 col-10 mx-auto">
        <h1 className="text-center mb-4">Edit Payment</h1>
        <form onSubmit={editPayments}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="studentName" className="form-label text-warning">Student Name:</label>
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
            <div className="col-md-6 mb-3">
              <label htmlFor="course" className="form-label text-warning">Select Course:</label>
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
            <div className="col-md-6 mb-3">
              <label htmlFor="sid" className="form-label text-warning">Student ID:</label>
              <input
                type="text"
                id="sid"
                name="sid"
                value={sid}
                onChange={(e) => setUpdateSid(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="contactNumber" className="form-label text-warning">Contact No:</label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={contactNumber}
                placeholder="07********"
                onChange={(e) => setUpdateContactNumber(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="address" className="form-label text-warning">Address:</label>
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
            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="form-label text-warning">E-mail:</label>
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
            <div className="col-12">
              <button type="submit" className="btn btn-warning w-100 mt-5">Update</button>
            </div>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default EditPayments;

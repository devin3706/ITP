import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditPayments() {
  const { Workoutid } = useParams();
  console.log("Workout id :", Workoutid);

  const navigate = useNavigate();

  const [studentName, setUpdateStudentName] = useState("");
  const [course, setUpdateCourse] = useState("");
  const [sid, setUpdateSid] = useState("");
  const [contactNumber, setUpdateContactNumber] = useState("");
  const [address, setUpdateAddress] = useState("");
  const [email, setUpdateEmail] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8081/workouts/get/${Workoutid}`)
      .then((res) => {
        console.log(res);
        setUpdateStudentName(res.data.studentName);
        setUpdateCourse(res.data.course);
        setUpdateSid(res.data.sid);
        setUpdateContactNumber(res.data.contactNumber);
        setUpdateAddress(res.data.address);
        setUpdateEmail(res.data.email);
      })
      .catch((err) => {
        alert("wda na");
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
      .put(`http://localhost:8081/workouts/update/${Workoutid}`, updateWorkout)
      .then((result) => {
        console.log(result);
        alert("Workout updated successfully.");
        navigate("/stallerprofile");
      })
      .catch((err) => {
        console.error("Error updating workout:", err);
        alert("Failed to update workout. Check console for details.");
      });

    console.log("Update Payload:", updateWorkout);
  };

  return (
    <div>
      <h1>Edit Payment</h1>
      <br></br>
      <div className="fullDiv m-5">
        <form className="row g-3 text-primary" onSubmit={editPayments}>
          <div className="col-md-6">
            <label htmlFor="studentName">[1] Student Name:</label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={studentName}
              onChange={(e) => {
                setUpdateStudentName(e.target.value);
              }}
              required
            />
          </div>
          <br></br>
          <div className="col-md-6">
            <label htmlFor="course">[2] Select Course:</label>
            <select
              id="course"
              name="course"
              value={course}
              onChange={(e) => {
                setUpdateCourse(e.target.value);
              }}
              required
            >
              <option value="">Select Course</option>
              <option value="A/L">Advance Level(A/L)</option>
              <option value="O/L">Ordinary Level(O/L)</option>
            </select>
          </div>
          <br></br>
          <div className="col-md-6">
            <label htmlFor="sid">[3] Student ID:</label>
            <input
              type="text"
              id="sid"
              name="sid"
              value={sid}
              onChange={(e) => {
                setUpdateSid(e.target.value);
              }}
              required
            />
          </div>
          <br></br>
          <div className="col-md-6">
            <label htmlFor="contactNumber">[4] Contact No:</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={contactNumber}
              placeholder="07********"
              onChange={(e) => {
                setUpdateContactNumber(e.target.value);
              }}
              required
            />
          </div>
          <br></br>
          <div className="col-md-6">
            <label htmlFor="address">[5] Address: </label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => {
                setUpdateAddress(e.target.value);
              }}
              required
            />
          </div>
          <br></br>
          <div className="col-md-6">
            <label htmlFor="email">[6] E-mail:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              placeholder="Example@address.com"
              onChange={(e) => {
                setUpdateEmail(e.target.value);
              }}
              required
            />
          </div>
          <br></br>
          <div className="mb-2 mt-4">
            <button type="submit" className="btn btn-warning">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPayments;

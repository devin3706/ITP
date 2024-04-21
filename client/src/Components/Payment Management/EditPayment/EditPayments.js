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
    <div className="fullDiv m-5 p-4 bg-dark text-white rounded-4 col-10 mx-auto">
      <h1>Edit Payment</h1>
      <div className="row">
        <form onSubmit={editPayments}>
          <div className="col-12 text-warning">
            <div className=" ">
              <label htmlFor="studentName" className="form-label">
                Student Name:
              </label>{" "}
              <br></br>
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
            <div className="">
              <label htmlFor="course" className="form-label">
                Select Course:
              </label>{" "}
              <br></br>
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
            <div className="">
              <label htmlFor="sid" className="form-label">
                Student ID:
              </label>{" "}
              <br></br>
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
            <div className="">
              <label htmlFor="contactNumber" className="form-label">
                Contact No:
              </label>{" "}
              <br></br>
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
            <div className="">
              <label htmlFor="address" className="form-label">
                Address:{" "}
              </label>{" "}
              <br></br>
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
            <div className="">
              <label htmlFor="email" className="form-label">
                E-mail:
              </label>{" "}
              <br></br>
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
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-warning">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPayments;

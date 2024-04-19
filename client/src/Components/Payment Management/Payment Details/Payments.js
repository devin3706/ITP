import React, { useEffect, useState } from "react";
import axios from "axios";
import "./payments.css";
import { useNavigate, Link } from "react-router-dom";

function Payments() {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    function readWorkouts() {
      axios
        .get("http://localhost:8081/workouts/read", readWorkouts)
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
      .delete(`http://localhost:8081/workouts/${Workoutid}`)
      .then(() => {
        alert("Workout Deleted.");
        navigate("/payment");
      })
      .catch((err) => {
        alert("couldn't delete the workout.", err);
      });
  }

  return (
    <div className="fullDiv m-5">
      <div className="row">
        {workouts.map((workouts) => (
          <div className="col-md-6 p-4">
            <div
              className="card-block p-4 rounded-3 text-start text-primary"
              style={{ backgroundColor: "#05242a" }}
            >
              <div className="row">
                <div className="col-md-6">
                  <br></br>
                  <label>Student Name</label>
                  <input
                    value={workouts.studentName}
                    className="form-control"
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <br></br>
                  <label>Course</label>
                  <input
                    value={workouts.course}
                    className="form-control"
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <br></br>
                  <label>Student ID</label>
                  <input
                    value={workouts.sid}
                    className="form-control"
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <br></br>
                  <label>Contact No</label>
                  <input
                    value={workouts.contactNumber}
                    className="form-control"
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <br></br>
                  <label>Address</label>
                  <input
                    value={workouts.address}
                    className="form-control"
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <br></br>
                  <label>E-mail</label>
                  <input
                    value={workouts.email}
                    className="form-control"
                    disabled
                  />
                </div>
                <div className="row">
                  <div className="mt-3 d-flex justify-content-between">
                    <button
                      className="btn btn-danger"
                      onClick={(d) => handleDelete(workouts._id)}
                    >
                      Delete
                    </button>
                    <div className="col-md-6">
                      <Link to={"/editpayments"}>
                        <input type="button" value="Update" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Payments;

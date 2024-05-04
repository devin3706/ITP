import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Payments() {
  const [workouts, setWorkouts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredWorkouts = workouts.filter(
    (workout) =>
      workout.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workout.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof workout.contactNumber === "string" &&
        workout.contactNumber
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      workout.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workout.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fullDiv m-5">
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by"
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="row">
        {filteredWorkouts.map((workout) => (
          <div className="col-md-6 p-4" key={workout._id}>
            <div
              className="card-block p-4 rounded-3 text-start text-primary"
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
                <div className="row">
                  <div className="mt-3 d-flex justify-content-between">
                    <button
                      className="btn btn-danger"
                      onClick={(d) => handleDelete(workout._id)}
                    >
                      Delete
                    </button>
                    <div className="col-md-6">
                      <Link to={`/editpayments/${workout._id}`}>
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

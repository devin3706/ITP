// ReadClass.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function ReadClass() {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    function readWorkouts() {
      axios
        .get("http://localhost:8081/classes")
        .then((res) => {
          setWorkouts(res.data);
        })
        .catch((err) => {
          console.error("Error fetching workouts:", err);
          alert("Failed to load workouts. Check console for details.");
        });
    }
    readWorkouts();
  }, []);

  function handleDelete(WorkoutId) {
    axios
      .delete(`http://localhost:8081/classes/${WorkoutId}`)
      .then(() => {
        alert("Class Deleted.");
        navigate("/classHome");
      })
      .catch((err) => {
        console.error("Error deleting workout:", err);
        alert("Failed to delete class. Check console for details.");
      });
  }

  return (
    <div className="fullDiv m-5">
      <div className="row">
        {workouts.map((workout) => (
          <div className="col-md-6 p-4" key={workout._id}>
            <div className="card-block p-4 rounded-3 text-start text-primary workout-card">
              <form className="workout-form">
                <div className="input-group">
                  <div className="input-box">
                    <label>Teacher Name</label>
                    <input
                      value={workout.teacherName}
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div className="input-box">
                    <label>Subject</label>
                    <input
                      value={workout.subject}
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div className="input-box">
                    <label>Date</label>
                    <input
                      value={workout.date}
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div className="input-box">
                    <label>Start Time</label>
                    <input
                      value={workout.time}
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div className="input-box">
                    <label>End Time</label>
                    <input
                      value={workout.duration}
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div className="input-box">
                    <label>Venue</label>
                    <input
                      value={workout.venue}
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div className="input-group-btn">
                  <Link to={`/updateClass/${workout._id}`}>
                    <button
                        type="button"
                        className="btn btn-primary update-button"
                      >
                        Update
                      </button>
                    </Link>

                    <button
                      type="button"
                      className="btn btn-danger delete-button"
                      onClick={() => handleDelete(workout._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReadClass;

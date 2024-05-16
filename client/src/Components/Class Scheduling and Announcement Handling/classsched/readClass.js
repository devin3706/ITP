import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";

function ReadClass() {
  const [workouts, setWorkouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
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

  function handleDelete(workoutId) {
    axios
      .delete(`http://localhost:8081/classes/${workoutId}`)
      .then(() => {
        alert("Class Deleted.");
        navigate("/classHome");
      })
      .catch((err) => {
        console.error("Error deleting class:", err);
        alert("Failed to delete class. Check console for details.");
      });
  }

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter workouts based on search term
  const filteredWorkouts = workouts.filter((workout) =>
    `${workout.teacherName} ${workout.subject} ${workout.date} ${workout.venue} ${workout.time} ${workout.duration}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "#ECF0F5" }}>
      <Header />
      <div className="headerBtns">
        <Link to="/dashboard" className="btn btn-grey fs-6">
          Dashboard
        </Link>
      </div>
      <div className="container-fluid mt-10 mb-10">
        <h1 className="text-center mb-5">Classes</h1>
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control mb-3"
        />
        <div className="row justify-content-center">
          {filteredWorkouts.map((workout) => (
            <div className="col-md-4 mb-4" key={workout._id}>
              <div className="card bg-white shadow rounded-3">
                <div className="card-body">
                  <form className="workout-form row">
                    <div className="mb-3 col-6">
                      <label className="form-label">Teacher Name:</label>
                      <input
                        value={workout.teacherName}
                        className="form-control"
                        disabled
                      />
                    </div>
                    <div className="mb-3 col-6">
                      <label className="form-label">Subject:</label>
                      <input
                        value={workout.subject}
                        className="form-control"
                        disabled
                      />
                    </div>
                    <div className="mb-3 col-6">
                      <label className="form-label">Date:</label>
                      <input
                        value={workout.date}
                        className="form-control"
                        disabled
                      />
                    </div>
                    <div className="mb-3 col-6">
                      <label className="form-label">Venue:</label>
                      <input
                        value={workout.venue}
                        className="form-control"
                        disabled
                      />
                    </div>
                    <div className="mb-3 col-6">
                      <label className="form-label">Start Time:</label>
                      <input
                        value={workout.time}
                        className="form-control"
                        disabled
                      />
                    </div>
                    <div className="mb-3 col-6">
                      <label className="form-label">End Time:</label>
                      <input
                        value={workout.duration}
                        className="form-control"
                        disabled
                      />
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(workout._id)}
                      >
                        Delete
                      </button>
                      <Link to={`/updateClass/${workout._id}`}>
                        <button type="button" className="btn btn-info">
                          Update
                        </button>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ReadClass;

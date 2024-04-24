/*import React, { useState } from "react";

function Attendance({ users }) {
  const [attendance, setAttendance] = useState({});

  const handleAttendanceChange = (id, isPresent) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [id]: isPresent,
    }));
  };

  return (
    <div className="container mt-4">
      <h2>Mark Attendance</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>
                <label>
                  <input
                    type="checkbox"
                    checked={attendance[user._id] || false}
                    onChange={(e) =>
                      handleAttendanceChange(user._id, e.target.checked)
                    }
                  />{" "}
                  Present
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-primary"
        onClick={() => console.log("Attendance:", attendance)}
      >
        Save Attendance
      </button>
    </div>
  );
}

export default Attendance;
*/
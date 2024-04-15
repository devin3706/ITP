import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function Users () {
    const[users, setUsers] = useState([{
        name: "Minsi" , email: "minsi@gmail.com", school: "Minsi" 
    }]);
   

    useEffect(() => {
        axios.get('http://localhost:8081/student')
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))
    },[]);

    const handleDelete = (id) => {
        axios.delete (`http://localhost:8081/student/deleteUser/${id}`)
        .then (res => {
          console.log (res);
          window.location.reload();
    })
        .catch (err => console.log(err));
    }

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: "#ECF0F5" }}>
            <div className = 'e-50 bg-white rounded p-3'>
                <Link to ="/createStudent" className = 'btn btn-success'> Add + </Link>  <Link to ="/dashboard" className = 'btn btn-success'> Dashboard </Link>
                <table className = 'table'>
                    <thead>
                        <tr>
                            <th> Name </th>
                            <th> Email </th>
                            <th> School</th>
                            <th> Contact Number</th>
                            <th> Address </th>
                            <th> Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => {
                                    return <tr>
                                       <td> {user.name} </td>
                                       <td> {user.email}  </td>
                                       <td>{user.school}  </td>
                                       <td>{user.number}  </td>
                                       <td>{user.address}  </td>
                                       <td>
                                        <Link to ='/updateStudent' className = 'btn btn-success'> Update</Link> 
                                         <button className='btn btn-danger' onClick={() => handleDelete(user._id)}>Delete</button>
                                         

                                      </td>
                                    </tr>

                                })
                            
                            }
                        </tbody>
                   </table>
                   </div> 
            
        </div>
    );
} 

export default Users;
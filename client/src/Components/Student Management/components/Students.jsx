import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";

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
        <div  style={{ backgroundColor: "#ECF0F5" }}>
        <Header/>
        <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
            <div className = 'e-50 bg-white rounded p-3 shadow'>
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
        <Footer/>
        </div>
    );
} 

export default Users;
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";
//sdfgh
//comment

function BSMarks() {
    const [bsmarks, setBSMarks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/marks')
            .then(result => setBSMarks(result.data))
            .catch(err => console.log(err))
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/marks/deleteBSMarks/${id}`)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    return (
        <div style={{backgroundColor: '#ECF0F5'}}>
            <Header/>
        <div className="d-flex mt-5 mb-5 vh-200 justify-content-center align-items-center"
            style={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh', 
                paddingTop: '20px', 
                paddingBottom: '20px'
            }}>
            <div className='w-50 bg-white rounded-3 shadow p-3'>
            <Link to="/dashboard" className='btn btn-success'> Dashboard </Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th> Name </th>
                            <th> Email </th>
                            <th> Marks</th>
                            <th> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bsmarks.map((bsmark, index) => (
                            <tr key={index}>
                                <td> {bsmark.name} </td>
                                <td> {bsmark.email}  </td>
                                <td>{bsmark.marks}  </td>
                                <td>
                                <Link to="/createbsmarks" className='btn btn-success'> Add + </Link> 
                                    <Link to={`/updatebsmarks/${bsmark._id}`} className='btn btn-success'> Update</Link>
                                    <button className='btn btn-danger' onClick={() => handleDelete(bsmark._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <Footer/>
        </div>
    );
}

export default BSMarks;

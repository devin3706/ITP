/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import axios from "axios";

function Questions2() {
    const [questions2, setQuestions2] = useState([]);
    const [formData, setFormData] = useState({
        studentName: "",
        studentID: "",
        classSelect: "",
        question: "",
        photo: null // To store the selected photo file
    });

    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(result => setQuestions2(result.data))
            .catch(err => console.log(err))
    }, []);

    const handleChange = (e) => {
        if (e.target.name === 'photo') {
            setFormData({ ...formData, photo: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataWithPhoto = new FormData();
        formDataWithPhoto.append('studentName', formData.studentName);
        formDataWithPhoto.append('studentID', formData.studentID);
        formDataWithPhoto.append('classSelect', formData.classSelect);
        formDataWithPhoto.append('question', formData.question);
        formDataWithPhoto.append('photo', formData.photo); // Append photo to FormData
        axios.post('http://localhost:8081/addQuestion', formDataWithPhoto)
            .then(res => {
                console.log(res);
                setQuestions2([...questions2, formData]);
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/deleteQuestion/${id}`)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 mbg-white rounded p-3">
                <h2>Mr.Sandeesh Quection page</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="studentName">Student Name:</label><br />
                    <input type="text" id="studentName" name="studentName" value={formData.studentName} onChange={handleChange} required /><br />

                    <label htmlFor="studentID">Student ID:</label><br />
                    <input type="text" id="studentID" name="studentID" value={formData.studentID} onChange={handleChange} required /><br />

                    <label htmlFor="classSelect">Select Class:</label><br />
                    <select id="classSelect" name="classSelect" value={formData.classSelect} onChange={handleChange} required>
                        <option value="">Select Class</option>
                        <option value="class1">2024 A/L Theory</option>
                        <option value="class2">2025 A/L Theory</option>
                        <option value="class1">2026 A/L Theory</option>
                        <option value="class2">Paper Class</option>
                    </select><br />

                    <label htmlFor="question">Question:</label><br />
                    <div style={{ position: 'relative' }}>
                        <textarea id="question" name="question" rows="4" cols="50" value={formData.question} onChange={handleChange} required></textarea>
                        <input type="file" id="photo" name="photo" accept="image/*" style={{ position: 'absolute', bottom: 5, right: 5 }} onChange={handleChange} />
                    </div>
                    <br />

                    <input type="submit" value="Submit Question" />
                </form>
            </div>
        </div>
    )
}

export default Questions2;
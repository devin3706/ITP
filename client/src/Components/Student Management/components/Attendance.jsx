// frontend: Attendance.jsx

import React, { useState, useEffect } from "react";
import axios from 'axios';
import jsPDF from 'jspdf';
import Header from "../../Exam Platform and Leaderboard/components/Header";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";

function Attendance() {
    const [file, setFile] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get('http://localhost:8081/attendance/getAllImages');
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            await axios.post('http://localhost:8081/attendance/upload', formData);
            fetchImages(); // Refresh images after successful upload
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/attendance/deleteImage/${id}`);
            fetchImages(); // Refresh images after successful delete
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const generatePDF = async (imageId) => {
        try {
            const response = await axios.get(`http://localhost:8081/attendance/getImage/${imageId}`, {
                responseType: 'blob' // Ensure response type is blob to handle binary data
            });
            const imageData = await response.data; // Image data as Blob
            const imageURL = URL.createObjectURL(imageData); // Create object URL for the blob
            const pdf = new jsPDF();
            pdf.addImage(imageURL, 'JPEG', 10, 10, 180, 120);
            pdf.save('attendance_record.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };
  
    return (
        <div style={{backgroundColor: '#ECF0F5'}}>
            <Header/>
            <div className="mt-5 mb-5">
                <input type="file" onChange={e => setFile(e.target.files[0])}/>
                <button onClick={handleUpload} className='btn btn-success'> Upload </button>
                <br/>
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={`http://localhost:8081/images/${image.image}`} alt="" />
                        <button className='btn btn-primary' onClick={() => generatePDF(image._id)}> Generate PDF </button>
                        <button className='btn btn-danger' onClick={() => handleDelete(image._id)}>Delete</button>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    );
} 

export default Attendance;

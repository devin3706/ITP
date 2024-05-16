import React, { useState, useEffect } from "react";
import axios from 'axios';
import jsPDF from 'jspdf';
import Header from "../../Exam Platform and Leaderboard/components/Header";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import SideNavBar from "../../Teacher Management/component/SideNavbar.jsx";

function Attendance() {
    const [file, setFile] = useState(null);
    const [images, setImages] = useState([]);
    const [date, setDate] = useState('');
    const [subject, setSubject] = useState('');
    const [batch, setBatch] = useState('');

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
            formData.append('date', date);
            formData.append('subject', subject);
            formData.append('batch', batch);
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

            const imageData = response.data; // Image data as Blob
            const reader = new FileReader();

            reader.onloadend = () => {
                const pdf = new jsPDF();
                pdf.addImage(reader.result, 'JPEG', 10, 10, 180, 160); // Adjust size as needed
                pdf.save('attendance_record.pdf');
            };

            reader.readAsDataURL(imageData); // Read the blob as a data URL
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <div style={{ backgroundColor: '#ECF0F5', textAlign: 'center', padding: '20px' }}>
            <Header />
            <SideNavBar />
            <div className="mt-5 mb-5" style={{ maxWidth: '800px', margin: 'auto', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
                <form onSubmit={(e) => { e.preventDefault(); handleUpload(); }}>
                    <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <input type="date" id="date" className="form-control" value={date} onChange={e => setDate(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject">Subject:</label>
                        <input type="text" id="subject" className="form-control" value={subject} onChange={e => setSubject(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="batch">Batch:</label>
                        <input type="text" id="batch" className="form-control" value={batch} onChange={e => setBatch(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="file">Upload Image:</label>
                        <input type="file" id="file" className="form-control" onChange={e => setFile(e.target.files[0])} required />
                    </div>
                    <button type="submit" className='btn btn-success'>Upload</button>
                </form>
                <br />
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                    {images.map((image, index) => (
                        <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '200px' }}>
                            <img src={`http://localhost:8081/images/${image.image}`} alt="" style={{ width: '200px', height: 'auto' }} />
                            <div>
                                <p>Date: {new Date(image.date).toLocaleDateString()}</p>
                                <p>Subject: {image.subject}</p>
                                <p>Batch: {image.batch}</p>
                            </div>
                            <button className='btn btn-primary' onClick={() => generatePDF(image._id)}>Generate PDF</button>
                            <button className='btn btn-danger' onClick={() => handleDelete(image._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Attendance;

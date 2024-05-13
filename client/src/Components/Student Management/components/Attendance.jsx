import React, { useState, useEffect } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import jsPDF from 'jspdf';
import Header from "../../Exam Platform and Leaderboard/components/Header";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";


function Attendance() {
    const [file, setFile] = useState()
    const [image, setImage] = useState()
    const navigate = useNavigate();

    const handleUpload = (e) => {
      const formdata = new FormData();
      formdata.append('file', file);
      axios.post('http://localhost:8081/attendance/upload', formdata)
          .then(res => console.log(res))
          .catch(err => console.log(err));
  };

    useEffect(() => {
        axios.get('http://localhost:8081/attendance/getImage')
        .then(res => setImage(res.data[0].image))
        .catch(err => console.log(err))
    }, []);

    const handleDelete = () => {
      //const imageId = image._id;
      axios.delete (`http://localhost:8081/attendance/deleteimage/${image}`)
      .then (res => {
        console.log (res);
        window.location.reload();
  })
      .catch (err => console.log(err));
  };

  const generatePDF = async () => {
    try {
        const response = await axios.get(`http://localhost:8081/attendance/images/${image}`);
        const imageData = response.data; // Assuming the image data is directly returned from the server
        const pdf = new jsPDF();
        pdf.addImage(imageData, 'JPEG', 10, 10, 180, 120);
        pdf.save('attendance_record.pdf');
    } catch (error) {
        console.error('Error fetching image data:', error);
    }
};

 /* const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.addImage(image, 'JPEG', 10, 10, 180, 120); 
    pdf.save('attendance_record.pdf');
  };

const handleDownloadPDF = () => {
  const input = modalRef.current;
  html2canvas(input)
      .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'PNG', 0, 0);
          pdf.save("attendancelog.pdf");
        })
    }*/

  
    return (
      <div style={{backgroundColor: '#ECF0F5'}}>
        <Header/>
      <div className="mt-5 mb-5">
        <input type = "file" onChange ={e => setFile(e.target.files[0])}/>
        <button onClick = {handleUpload} className = 'btn btn-success'> Upload </button>
        <br/>
        <p>
          <br/><br/>
        <img src = {`http://localhost:8081/images/file_1715311166934.png`} alt = "" />
        <button className='btn btn-primary' onClick = {generatePDF}> Generate PDF </button> <button className='btn btn-danger' onClick={() => handleDelete(image._id)}>Delete</button>
        </p>
        <p>
        <img src = {`http://localhost:8081/images/file_1715311166934.png`} alt = "" />
        <button className='btn btn-primary' onClick = {generatePDF}> Generate PDF </button> <button className='btn btn-danger' onClick={() => handleDelete(image._id)}>Delete</button>
        </p><p>
        <img src = {`http://localhost:8081/images/file_1715311166934.png`} alt = "" />
        <button className='btn btn-primary' onClick = {generatePDF}> Generate PDF </button> <button className='btn btn-danger' onClick={() => handleDelete(image._id)}>Delete</button>
        </p>
        <p>
        <img src = {`http://localhost:8081/images/file_1715311166934.png`} alt = "" />
        <button className='btn btn-primary' onClick = {generatePDF}> Generate PDF </button> <button className='btn btn-danger' onClick={() => handleDelete(image._id)}>Delete</button>
        </p>
        
        
        
        
        
    </div>
    <Footer/>
    </div>
);
} 

export default Attendance;
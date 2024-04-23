import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import Header from '../Exam Platform and Leaderboard/components/Header';
import Footer from '../Exam Platform and Leaderboard/components/Footer';

const PdfViewer = () => {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    fetchPdfs();
  }, []);

  const fetchPdfs = async () => {
    try {
      const response = await axios.get('http://localhost:8081/studyMaterial/get-files');
      setPdfs(response.data.data);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    }
  };

  const downloadPdf = async (pdfId) => {
    try {
      const response = await axios.get(`http://localhost:8081/studyMaterial/files/${pdfId}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${pdfId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <div style={{backgroundColor: '#ECF0F5'}}>
    <Header/>
    <div className="container col-8 d-flex justify-content-center">
      <div className='alert alert-light text-center border border-primary rounded mt-5 mb-5'>
        <h1 className='text-center text-dark mt-4'>Teacher Uploaded PDFs</h1>
        <div className='row'>
        {pdfs.map((pdf) => (
          <div key={pdf._id} className='col-4'>
            <h3 className="mt-5">{pdf.title}</h3>
            <button className='btn btn-info' onClick={() => downloadPdf(pdf.pdf)}>Download PDF</button>
            <div className="pdf-preview">
              <Document file={`http://localhost:8081/studyMaterial/files/${pdf.pdf}`}>
                <Page pageNumber={1} />
              </Document>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
    <Footer/>
    </div>

  );
};

export default PdfViewer;

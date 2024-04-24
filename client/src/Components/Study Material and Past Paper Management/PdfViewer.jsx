import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import PdfComp from "../Study Material and Past Paper Management/PdfComp.js";
import Footer from "../Exam Platform and Leaderboard/components/Footer.js";
import Header from '../Exam Platform and Leaderboard/components/Header';
import Footer from '../Exam Platform and Leaderboard/components/Footer';

const PdfViewer = () => {
  const [pdfs, setPdfs] = useState([]);
  const [filteredPdfs, setFilteredPdfs] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPdfPopup, setShowPdfPopup] = useState(false);

  useEffect(() => {
    fetchPdfs();
  }, []);

  const fetchPdfs = async () => {
    try {
      const response = await axios.get('http://localhost:8081/studyMaterial/get-files');
      const pdfsWithLikes = response.data.data.map(pdf => ({ ...pdf, likes: 0, dislikes: 0 }));
      setPdfs(pdfsWithLikes);
      setFilteredPdfs(pdfsWithLikes);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    }
  };

  const showPdf = (pdf) => {
    setPdfFile(`http://localhost:8081/studyMaterial/files/${pdf}`)
    setShowPdfPopup(true); 
   };
 
   const closePdfPopup = () => {
     setShowPdfPopup(false); // Close the PDF popup
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
      alert("Downloading!");
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  const likePdf = (pdfId) => {
    setPdfs(pdfs.map(pdf => pdf._id === pdfId ? { ...pdf, likes: pdf.likes + 1 } : pdf));
  };

  const dislikePdf = (pdfId) => {
    setPdfs(pdfs.map(pdf => pdf._id === pdfId ? { ...pdf, dislikes: pdf.dislikes + 1 } : pdf));
  };

  useEffect(() => {
    const filtered = pdfs.filter(pdf =>
      pdf.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPdfs(filtered);
  }, [searchTerm, pdfs]);

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
  )
};

export default PdfViewer;

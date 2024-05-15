import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import Header from "../../Exam Platform and Leaderboard/components/Header";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import SideNavbar from "../../Teacher Management/component/SideNavbar";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  header: {
    fontSize: 24,
    marginBottom: 20
  },
  question: {
    marginBottom: 10
  }
});

function UpdateInquiry() {
  const [inquiries, setInquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const apiUrl = 'http://localhost:8081/inquiry';

    axios.get(apiUrl)
      .then(result => {
        setInquiries(result.data);
        console.log("Inquiries fetched successfully:", result.data);
      })
      .catch(error => {
        console.error("Error fetching inquiries:", error);
        console.error("Request URL:", apiUrl);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/inquiry/deleteInquiry/${id}`)
      .then(res => {
        console.log("Inquiry deleted successfully:", res.data);
        // Update the inquiries state by filtering out the deleted inquiry
        setInquiries(prevInquiries => prevInquiries.filter(inquiry => inquiry._id !== id));
      })
      .catch(error => {
        console.log("Error deleting inquiry:", error);
        // Display a user-friendly message to the user, e.g., show an error toast
      });
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    return inquiry.Teacher.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const QuestionSheet = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Question Sheet</Text>
          {filteredInquiries.map((inquiry, index) => (
            <Text key={index} style={styles.question}>
              {inquiry.Question}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <div style={{ backgroundColor: '#ECF0F5'}}>
      <Header />
      <SideNavbar />
      <div className="d-flex mt-10 mb-10 row justify-content-center align-items-center">
        <div className="col-8 bg-white rounded p-3">
          <div className="mb-3">
            <h2 className="card-title">Student's Questions</h2>
            <input 
              type="text" 
              placeholder="Search by teacher name" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="form-control"
            />
          </div>
          <div className="table-responsive" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
            {/* Adjust the maxHeight as per your requirement */}
            <table className="table table-striped">
              <thead>               
              </thead>
              <tbody>
                {filteredInquiries.map((inquiry) => (
                  <tr key={inquiry._id}>
                    <td>{inquiry.Email}</td>
                    <td>{inquiry.Teacher}</td>
                    <td>{inquiry.Class}</td>
                    <td>{inquiry.Question}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PDFDownloadLink document={<QuestionSheet />} fileName="question_sheet.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Question Sheet')}
          </PDFDownloadLink>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default UpdateInquiry;

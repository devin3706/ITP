import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";
import jsPDF from "jspdf";

const PayDetails = () => {
  const [payers, setPayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    function readPayers() {
      axios
        .get("http://localhost:8081/payers/read")
        .then((res) => {
          setPayers(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    readPayers();
  }, []);

  function handleDelete(Payerid) {
    axios
      .delete(`http://localhost:8081/payers/delete/${Payerid}`)
      .then(() => {
        alert("payment Deleted.");
        navigate("/onlinePay");
      })
      .catch((err) => {
        alert("couldn't delete the payment.", err);
      });
  }

  const filteredPayers = payers.filter(
    (payer) =>
      (payer.payerName &&
        payer.payerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (typeof payer.cardNo === "string" &&
        payer.cardNo.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (typeof payer.nic === "string" &&
        payer.nic.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (typeof payer.amount === "string" &&
        payer.amount.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (typeof payer.date === "string" &&
        payer.date.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 255); // Blue color
    doc.text("Payer Details", 10, 20); // Heading
    doc.setTextColor(0); // Reset text color to black
    let y = 30; // Initial Y position
    filteredPayers.forEach((workout, index) => {
      // Add background colors to alternate rows
      if (index % 2 === 0) {
        doc.setFillColor(211, 211, 211); // Grey color
      } else {
        doc.setFillColor(255, 255, 255);
      }
      doc.rect(0, y - 5, 220, 50, "F"); // Draw rectangle behind each row

      // Add data to PDF
      doc.setFontSize(12);
      doc.setTextColor(0); // Set text color to black
      doc.text(`Payer Name: ${workout.payerName}`, 10, y);
      doc.text(`Card No: ${workout.cardNo}`, 10, y + 10);
      doc.text(`NIC: ${workout.nic}`, 10, y + 20);
      doc.text(`Amount: ${workout.amount}`, 10, y + 30);
      doc.text(`Date: ${workout.date}`, 10, y + 40);
      y += 60; // Increment Y position for next entry
    });
    doc.save("payerDetails.pdf"); // Save PDF
  };

  return (
    <div style={{ backgroundColor: "#ECF0F5" }}>
      <Header />
      <div className="fullDiv m-5">
        <button className="btn btn-primary" onClick={generatePDF}>
          Generate PDF
        </button>
        <div className="col-md-12">
          <input
            type="text"
            placeholder="Search by"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control shadow"
          />
        </div>
        <div className="row">
          {filteredPayers.map((payer) => (
            <div className="col-md-6 p-4" key={payer._id}>
              <div
                className="card-block p-4  shadow rounded-3 text-start text-warning"
                style={{ backgroundColor: "#05242a" }}
              >
                <div className="row">
                  <div className="col-sm-6">
                    <br />
                    <label>Payer Name</label>
                    <input
                      value={payer.payerName}
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div className="col-sm-6">
                    <br />
                    <label>Card No</label>
                    <input
                      value={payer.cardNo}
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div className="col-sm-6">
                    <br />
                    <label>NIC</label>
                    <input
                      value={payer.nic}
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div className="col-sm-6">
                    <br />
                    <label>Amount</label>
                    <input
                      value={payer.amount}
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div className="col-sm-6">
                    <br />
                    <label>Date</label>
                    <input
                      value={payer.date}
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div className="">
                    <div className="mt-3 d-flex justify-content-between">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(payer._id)}
                      >
                        Delete
                      </button>

                      <Link to={`/editdetails/${payer._id}`}>
                        <input
                          type="button"
                          className="btn btn-info"
                          value="Update"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PayDetails;

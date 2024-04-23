import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../Exam Platform and Leaderboard/components/Header";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";

function PayOnline() {
  // State variables to store form data
  const [payerName, setPayerName] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [nic, setNic] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const submitPayers = (event) => {
    event.preventDefault();

    const newPayers = {
      payerName,
      cardNo,
      nic,
      cvv,
      expiryDate,
    };

    axios
      .post("http://localhost:8081/payers/create", newPayers)
      .then(() => {
        alert("Payer added successfully.");
      })
      .catch((err) => {
        console.error("Error adding payer:", err);
        alert("Failed to add payer. Check console for details.");
      });
  };

  return (
    <div style={{backgroundColor: '#ECF0F5'}}>
      <Header/>
      <h1 className="text-center mt-5 mb-5">Online Payment</h1>
      <div className="container col-5">
        <form className="row g-3 bg-dark justify-content-center border border-dark rounded" onSubmit={submitPayers}>
          <div className="col-md-8">
            <label htmlFor="payerName" className="form-label text-warning">[1] Payer Name:</label>
            <input
              type="text"
              id="payerName"
              name="payerName"
              value={payerName}
              onChange={(e) => setPayerName(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-8">
            <label htmlFor="cardNo" className="form-label text-warning">[2] Card No:</label>
            <input
              type="text"
              id="cardNo"
              name="cardNo"
              value={cardNo}
              onChange={(e) => setCardNo(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-8">
            <label htmlFor="nic" className="form-labe text-warning">[3] NIC:</label>
            <input
              type="text"
              id="nic"
              name="nic"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-8">
            <label htmlFor="cvv" className="form-label text-warning">[4] CVV:</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-8">
            <label htmlFor="expiryDate" className="form-label text-warning">[5] Expiry Date:</label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-8 mt-5 d-flex justify-content-center mb-4">
            <input type="submit" value="Pay Now" className="btn btn-primary" />
            <Link to={"/payerDetails"}>
              <input type="button" value="Payer Details" className="btn btn-grey ml-5" />
            </Link>
          </div>
        </form>
      </div>
      <Footer/>
    </div>

  );
}

export default PayOnline;
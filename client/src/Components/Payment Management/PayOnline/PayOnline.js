import React, { useState } from "react";
import "./PayOnline.css";
import { Link } from "react-router-dom";
import axios from "axios";

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
    <div>
      <h1>Online Payment</h1>
      <br />
      <div>
        <form className="row g-3 text-primary" onSubmit={submitPayers}>
          <div className="col-md-12">
            <label htmlFor="payerName">[1] Payer Name:</label>
            <input
              type="text"
              id="payerName"
              name="payerName"
              value={payerName}
              onChange={(e) => setPayerName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="cardNo">[2] Card No:</label>
            <input
              type="text"
              id="cardNo"
              name="cardNo"
              value={cardNo}
              onChange={(e) => setCardNo(e.target.value)}
              required
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="nic">[3] NIC:</label>
            <input
              type="text"
              id="nic"
              name="nic"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              required
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="cvv">[4] CVV:</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="expiryDate">[5] Expiry Date:</label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          <div className="col-md-12">
            <input type="submit" value="Pay Now" />
          </div>
          <div className="col-md-12">
            <Link to={"/payerDetails"}>
              <input type="button" value="Payer Details" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PayOnline;
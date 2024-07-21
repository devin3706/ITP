import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";

function Editdetails() {
  const { Payerid } = useParams();
  console.log("Payer id :", Payerid);

  const navigate = useNavigate();

  const [payerName, setUpdatePayerName] = useState("");
  const [cardNo, setUpdateCardNo] = useState(0);
  const [nic, setUpdateNic] = useState(0);
  const [amount, setUpdateAmount] = useState(0);
  const [date, setUpdateDate] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8081/payers/get/${Payerid}`)
      .then((res) => {
        console.log(res.data);
        setUpdatePayerName(res.data.payerName);
        setUpdateCardNo(res.data.cardNo);
        setUpdateNic(res.data.nic);
        setUpdateAmount(res.data.amount);
        setUpdateDate(res.data.date);
      })
      .catch((err) => {
        alert("wda na", err);
      });
  }, [Payerid]);

  const editDetails = (e) => {
    e.preventDefault();

    const updatePayer = {
      payerName,
      cardNo,
      nic,
      amount,
      date,
    };

    axios
      .put(`http://localhost:8081/payers/update/${Payerid}`, updatePayer)
      .then((result) => {
        console.log(result);
        alert("updated successfully.");
        navigate("/payerDetails");
      })
      .catch((err) => {
        console.error("Error updating details:", err);
        alert("Failed to update details. Check console for details.");
      });

    console.log("Update Payload:", updatePayer);
  };

  return (
    <div style={{ backgroundColor: '#ECF0F5'}}>
      <Header/>
      <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="bg-dark text-white shadow rounded-4 p-4">
            <form onSubmit={editDetails}>
              <div className="text-warning">
                <div className="mb-3">
                  <label htmlFor="payerName" className="form-label">Payer Name:</label>
                  <input
                    type="text"
                    id="payerName"
                    name="payerName"
                    value={payerName}
                    onChange={(e) => setUpdatePayerName(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="cardNo" className="form-label">Card No:</label>
                  <input
                    type="text"
                    id="cardNo"
                    name="cardNo"
                    value={cardNo}
                    onChange={(e) => setUpdateCardNo(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="nic" className="form-label">NIC:</label>
                  <input
                    type="text"
                    id="nic"
                    name="nic"
                    value={nic}
                    onChange={(e) => setUpdateNic(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">Amount:</label>
                  <input
                    type="text"
                    id="amount"
                    name="amount"
                    value={amount}
                    onChange={(e) => setUpdateAmount(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Date:</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    onChange={(e) => setUpdateDate(e.target.value)}
                    className="form-control col-3"
                    required
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-warning">Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
  );
}

export default Editdetails;

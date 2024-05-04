import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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
    <div className="fullDiv m-5 p-4 bg-dark text-white rounded-4 col-10 mx-auto">
      <div className="row">
        <form onSubmit={editDetails}>
          <div className="col-12 text-warning">
            <div className=" ">
              <label htmlFor="payerName" className="form-label">
                Payer Name:
              </label>{" "}
              <br></br>
              <input
                type="text"
                id="payerName"
                name="payerName"
                value={payerName}
                onChange={(e) => {
                  setUpdatePayerName(e.target.value);
                }}
                required
              />
            </div>
            <div className="">
              <label htmlFor="cardNo" className="form-label">
                Card No:
              </label>{" "}
              <br></br>
              <input
                type="text"
                id="cardNo"
                name="cardNo"
                value={cardNo}
                onChange={(e) => {
                  setUpdateCardNo(e.target.value);
                }}
                required
              />
            </div>
            <div className="">
              <label htmlFor="nic" className="form-label">
                NIC:
              </label>{" "}
              <br></br>
              <input
                type="text"
                id="nic"
                name="nic"
                value={nic}
                onChange={(e) => {
                  setUpdateNic(e.target.value);
                }}
                required
              />
            </div>
            <div className="">
              <label htmlFor="amount" className="form-label">
                Amount:
              </label>{" "}
              <br></br>
              <input
                type="text"
                id="amount"
                name="amount"
                value={amount}
                onChange={(e) => {
                  setUpdateAmount(e.target.value);
                }}
                required
              />
            </div>
            <div class="">
              <label htmlFor="date" className="form-lable">
                Date:
              </label>{" "}
              <br></br>
              <input
                type="date"
                id="date"
                name="date"
                value={date}
                onChange={(e) => {
                  setUpdateDate(e.target.value);
                }}
                required
              />
            </div>
            <br></br>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-warning">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Editdetails;

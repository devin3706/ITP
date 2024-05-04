import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

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

  return (
    <div className="fullDiv m-5">
      <div className="col-md-12">
        <input
          type="text"
          placeholder="Search by"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="row">
        {filteredPayers.map((payer) => (
          <div className="col-md-6 p-4" key={payer._id}>
            <div
              className="card-block p-4 rounded-3 text-start text-warning"
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
                  <input value={payer.nic} className="form-control" disabled />
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
                  <input value={payer.date} className="form-control" disabled />
                </div>
                <div className="row">
                  <div className="mt-3 d-flex justify-content-between">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(payer._id)}
                    >
                      Delete
                    </button>
                    <div className="col-md-6">
                      <Link to={`/editdetails/${payer._id}`}>
                        <input type="button" value="Update" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayDetails;

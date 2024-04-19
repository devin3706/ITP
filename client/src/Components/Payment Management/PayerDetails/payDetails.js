import React from "react";

function payDetails() {
  return (
    <div>
      <h1>Pay Details</h1>
      <br></br>
      <div className="col-sm-7 p-3">
        <div
          className="card-block p-4 rounded-3 text-start text-warning"
          style={{ backgroundColor: "#05242a" }}
        >
          <div className="row">
            <div className="col-sm-6">
              <br></br>
              <p>Payer Name</p>
              <input className="form-control" disabled />
            </div>
            <div className="col-sm-6">
              <br></br>
              <p>Card No</p>
              <input className="form-control" disabled />
            </div>
            <div className="col-sm-6">
              <br></br>
              <p>NIC</p>
              <input className="form-control" disabled />
            </div>
            <div className="col-sm-6">
              <br></br>
              <p>CVV</p>
              <input className="form-control" disabled />
            </div>
            <div className="col-sm-6">
              <br></br>
              <p>Date</p>
              <input className="form-control" disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default payDetails;

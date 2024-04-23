import React from "react";
import Header from "../../Exam Platform and Leaderboard/components/Header";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";

function payDetails() {
  return (
    <div style={{backgroundColor: '#ECF0F5'}}>
    <Header/>
    <div className="d-flex justify-content-center">
      <div className="col-sm-6 p-3 mt-5">
        <div className="card-block p-4 rounded-3 text-start text-warning" style={{ backgroundColor: "#05242a" }}>
          <h1 className="text-center mb-4 text-light">Pay Details</h1>
          <div className="row mt-5">
            <div className="col-sm-6 mb-4">
              <p>Payer Name</p>
              <input className="form-control" disabled />
            </div>
            <div className="col-sm-6 mb-4">
              <p>Card No</p>
              <input className="form-control" disabled />
            </div>
            <div className="col-sm-6 mb-4">
              <p>NIC</p>
              <input className="form-control" disabled />
            </div>
            <div className="col-sm-6 mb-4">
              <p>CVV</p>
              <input className="form-control" disabled />
            </div>
            <div className="col-sm-6 mb-4">
              <p>Date</p>
              <input className="form-control" disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default payDetails;

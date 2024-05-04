import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PayOnline() {
  const navigate = useNavigate();

  const initialValues = {
    payerName: "",
    cardNo: "",
    nic: "",
    amount: "",
    date: "",
  };

  const validationSchema = Yup.object().shape({
    payerName: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "*Payer name is not valid")
      .required("*Payer Name is required"),
    cardNo: Yup.string()
      .required("*Card No is required")
      .matches(/^\d{16}$/, "*Card No is not valid"),
    nic: Yup.string()
      .required("*NIC is required")
      .matches(/^\d{12}$/, "*NIC must is not valid"),
    amount: Yup.number()
      .typeError("*Amount must be a number")
      .positive("*Amount must be positive")
      .required("*Amount is required"),
    date: Yup.date().required("*Date is required"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    axios
      .post("http://localhost:8081/payers/create", values)
      .then(() => {
        navigate("/payerDetails");
      })
      .catch((err) => {
        console.error("Error adding payers:", err);
        alert("Failed to add payers. Check console for details.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="fullDiv m-5 p-4 bg-dark text-white rounded-4 col-10 mx-auto">
      <h1>Payment</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="row">
            <div className="col-12 text-warning">
              <div className="">
                <label htmlFor="payerName">Payer Name:</label>
                <br />
                <Field type="text" id="payerName" name="payerName" />
                <ErrorMessage
                  name="payerName"
                  component="div"
                  className="text-danger"
                />
              </div>
              <br />
              <div className="">
                <label htmlFor="cardNo">Card No:</label>
                <br />
                <Field type="text" id="cardNo" name="cardNo" />
                <ErrorMessage
                  name="cardNo"
                  component="div"
                  className="text-danger"
                />
              </div>
              <br />
              <div className="">
                <label htmlFor="nic">NIC:</label>
                <br />
                <Field type="text" id="nic" name="nic" />
                <ErrorMessage
                  name="nic"
                  component="div"
                  className="text-danger"
                />
              </div>
              <br />
              <div className="">
                <label htmlFor="amount">Amount:</label>
                <br />
                <Field type="text" id="amount" name="amount" />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-danger"
                />
              </div>
              <br />
              <div className="col-md-12">
                <label htmlFor="date">Date:</label>
                <br />
                <Field type="date" id="date" name="date" />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-danger"
                />
              </div>
              <br />
              <div className="d-flex justify-content-between">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Pay now"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default PayOnline;

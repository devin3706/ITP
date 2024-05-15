import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";

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
      .matches(/^[a-zA-Z\s]+$/, {
        message: "Only letters and spaces are allowed",
        excludeEmptyString: true,
      })
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
    <div style={{ backgroundColor: "#ECF0F5" }}>
      <Header />
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="m-4 p-4 bg-dark text-white rounded-4">
              <h1 className="mb-4 text-center">Payment</h1>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form>
                    <div className="text-warning">
                      <div className="mb-3">
                        <label htmlFor="payerName" className="form-label">
                          Payer Name:
                        </label>
                        <Field
                          type="text"
                          id="payerName"
                          name="payerName"
                          className="form-control"
                          onChange={(e) => {
                            const newValue = e.target.value.replace(
                              /[^a-zA-Z\s]/g,
                              ""
                            );
                            setFieldValue("payerName", newValue);
                          }}
                        />
                        <ErrorMessage
                          name="payerName"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="cardNo" className="form-label">
                          Card No:
                        </label>
                        <Field
                          type="number"
                          id="cardNo"
                          name="cardNo"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="cardNo"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="nic" className="form-label">
                          NIC:
                        </label>
                        <Field
                          type="number"
                          id="nic"
                          name="nic"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="nic"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="amount" className="form-label">
                          Amount:
                        </label>
                        <Field
                          type="number"
                          id="amount"
                          name="amount"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="amount"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="date" className="form-label">
                          Date:
                        </label>
                        <Field
                          type="date"
                          id="date"
                          name="date"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="date"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <br></br>
                      <div className="">
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PayOnline;

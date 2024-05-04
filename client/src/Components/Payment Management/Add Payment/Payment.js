import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";

function Payment() {
  const navigate = useNavigate();

  const initialValues = {
    studentName: "",
    course: "",
    contactNumber: "",
    address: "",
    email: "",
  };

  const validationSchema = Yup.object({
    studentName: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces are allowed")
      .required("Student name is required"),
    course: Yup.string().required("Course selection is required"),
    contactNumber: Yup.string()
      .matches(/^\d{10}$/, "Contact number must be 10 digits")
      .required("Contact number is required"),
    address: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces are allowed")
      .required("Address is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    axios
      .post("http://localhost:8081/payments/create", values)
      .then(() => {
        navigate("/paymentdetails");
      })
      .catch((err) => {
        console.error("Error adding workouts:", err);
        alert("Failed to add workouts. Check console for details.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div style={{ backgroundColor: '#ECF0F5'}}>
      <Header/>
      <div className="fullDiv mt-10 mb-10 p-4 bg-dark text-white rounded-4 col-10 mx-auto">
        <h1>Payment</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            isSubmitting,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
          }) => (
            <Form className="mt-4">
              <div className="col-12 text-warning">
                <div className="col-md-12">
                  <label htmlFor="studentName" className="form-label">
                    Student Name:
                  </label>
                  <Field
                    className={`form-control ${
                      errors.studentName && touched.studentName
                        ? "is-invalid"
                        : ""
                    }`}
                    type="text"
                    id="studentName"
                    name="studentName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.studentName}
                  />
                  <ErrorMessage
                    name="studentName"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="mt-3">
                  <div className="col-md-5">
                    <label htmlFor="course" className="form-label">
                      Select Course:
                    </label>
                    <Field
                      as="select"
                      className={`form-control ${
                        errors.course && touched.course ? "is-invalid" : ""
                      }`}
                      id="course"
                      name="course"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.course}
                    >
                      <option value="">Select Course</option>
                      <option value="A/L">Advance Level(A/L)</option>
                      <option value="O/L">Ordinary Level(O/L)</option>
                    </Field>
                    <ErrorMessage
                      name="course"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <div className="col-md-5">
                    <label htmlFor="contactNumber" className="form-label">
                      Contact No:
                    </label>
                    <Field
                      className={`form-control ${
                        errors.contactNumber && touched.contactNumber
                          ? "is-invalid"
                          : ""
                      }`}
                      type="text"
                      id="contactNumber"
                      name="contactNumber"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.contactNumber}
                    />
                    <ErrorMessage
                      name="contactNumber"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>

                <div className="col-md-12 mt-3">
                  <label htmlFor="address" className="form-label">
                    Address:
                  </label>
                  <Field
                    className={`form-control ${
                      errors.address && touched.address ? "is-invalid" : ""
                    }`}
                    type="text"
                    id="address"
                    name="address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="col-md-5 mt-3">
                  <label htmlFor="email" className="form-label">
                    E-mail:
                  </label>
                  <Field
                    className={`form-control ${
                      errors.email && touched.email ? "is-invalid" : ""
                    }`}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Example@address.com"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <br />
                <br />
                <div className="d-flex justify-content-between">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                  <Link to={"/onlinePay"}>
                    <button type="button" className="btn btn-success">
                      Pay Online
                    </button>
                  </Link>
                </div>
                <br />
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Footer/>
    </div>
  );
}

export default Payment;

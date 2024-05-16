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
    slip: null,
  };

  const validationSchema = Yup.object({
    studentName: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, {
        message: "Only letters and spaces are allowed",
        excludeEmptyString: true,
      })
      .required("Student name is required"),
    course: Yup.string().required("Course selection is required"),
    contactNumber: Yup.string()
      .matches(/^\d{10}$/, "Contact number must be 10 digits")
      .required("Contact number is required"),
    address: Yup.string().required("Address is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    slip: Yup.mixed().required("Slip is required"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("studentName", values.studentName);
    formData.append("course", values.course);
    formData.append("contactNumber", values.contactNumber);
    formData.append("address", values.address);
    formData.append("email", values.email);
    formData.append("slip", values.slip);

    axios
      .post("http://localhost:8081/payments/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
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
    <div style={{ backgroundColor: "#ECF0F5" }}>
      <Header />
      <div className="headerBtns">
          <Link to='/dashboard' className="btn btn-grey fs-6">Dashboard</Link>
      </div>
      <div className="container mt-5 mb-5 row justify-content-center col-lg-8 m-4 p-4 bg-dark text-white rounded-4 col-10 mx-auto">
        <h1 className="mb-4 text-center">Payment</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            isSubmitting,
            handleChange,
            handleBlur,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <Form>
              <div className="text-warning">
                <div className="mb-3">
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
                    onChange={(e) => {
                      const newValue = e.target.value.replace(
                        /[^a-zA-Z\s]/g,
                        ""
                      );
                      setFieldValue("studentName", newValue);
                    }}
                    onBlur={handleBlur}
                    value={values.studentName}
                  />
                  <ErrorMessage
                    name="studentName"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="mb-3">
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

                <div className="mb-3">
                  <label htmlFor="contactNumber" className="form-label">
                    Contact No:
                  </label>
                  <Field
                    className={`form-control ${
                      errors.contactNumber && touched.contactNumber
                        ? "is-invalid"
                        : ""
                    }`}
                    type="number"
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

                <div className="mb-3">
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

                <div className="mb-3">
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

                <div className="mb-3">
                  <label htmlFor="slip" className="form-label">
                    Upload Slip:
                  </label>
                  <input
                    type="file"
                    id="slip"
                    name="slip"
                    onChange={(event) => {
                      setFieldValue("slip", event.currentTarget.files[0]);
                    }}
                    onBlur={handleBlur}
                    className={`form-control ${
                      errors.slip && touched.slip ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="slip"
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
      <Footer />
    </div>
  );
}

export default Payment;

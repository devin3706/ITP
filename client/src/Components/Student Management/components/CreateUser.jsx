import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";
import Header from "../../Exam Platform and Leaderboard/components/Header";

function CreateUser() {
  const navigate = useNavigate();
  const [nameError, setNameError] = useState("");

  const initialValues = {
    name: "",
    email: "",
    school: "",
    number: "",
    address: ""
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }

    if (!values.school) {
      errors.school = "School is required";
    }

    if (!values.number) {
      errors.number = "Number is required";
    }

    if (!values.address) {
      errors.address = "Address is required";
    }

    return errors;
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(value)) {
      setNameError("Name can only contain letters");
    } else {
      setNameError(""); // Clear any existing error message
    }
  };

  return (
    <div style={{ backgroundColor: "#ECF0F5" }}>
      <Header />
      <div className="d-flex mt-5 mb-5 vh-100 justify-content-center align-items-center">
        <div className="bg-white p-3 rounded-3 w-50 shadow">
          <h2>Add User</h2>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={(values, { setSubmitting }) => {
              axios
                .post("http://localhost:8081/student/createUser", values)
                .then((result) => {
                  console.log(result);
                  navigate("/login");
                })
                .catch((err) => console.log(err))
                .finally(() => {
                  setSubmitting(false);
                });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-2">
                  <label htmlFor="name">
                    <strong>Name</strong>
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Name"
                    className="form-control"
                    onChange={handleNameChange}
                  />
                  {nameError && (
                    <div className="text-danger">{nameError}</div>
                  )}
                </div>
                <div className="mb-2">
                  <label htmlFor="email">
                    <strong>Email</strong>
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="school">
                    <strong>School</strong>
                  </label>
                  <Field
                    type="text"
                    id="school"
                    name="school"
                    placeholder="Enter School"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="school"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="number">
                    <strong>Contact Number</strong>
                  </label>
                  <Field
                    type="tel"
                    id="number"
                    name="number"
                    placeholder="Enter Contact Number"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="number"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="address">
                    <strong>Address</strong>
                  </label>
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Enter Address"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-success w-100 rounded-0"
                  disabled={isSubmitting || nameError}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateUser;

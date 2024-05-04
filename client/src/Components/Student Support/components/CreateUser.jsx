import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../../Exam Platform and Leaderboard/components/Header";
import Footer from "../../Exam Platform and Leaderboard/components/Footer";

function CreateUser() {
  const navigate = useNavigate();

  const [Rating, setRating] = useState(0); // State for rating

  const validationSchema = Yup.object().shape({
    Name: Yup.string().required("Name is required"),
    Email: Yup.string().email("Invalid email").required("Email is required"),
    Teacher: Yup.string().required("Teacher name is required"),
    Feedback: Yup.string().required("Feedback is required"),
    Rating: Yup.number().required("Rating is required").min(1).max(5),
  });

  const formik = useFormik({
    initialValues: {
      Name: "",
      Email: "",
      Teacher: "",
      Feedback: "",
      Rating: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post("http://localhost:8081/users/create", values)
        .then((result) => {
          console.log(result);
          navigate("/users");
        })
        .catch((err) => console.log(err));
    },
  });

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    formik.setFieldValue("Rating", newRating); // Update Formik's Rating field value
  };

  // Function to render star rating UI
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{ cursor: "pointer" }}
          onClick={() => handleRatingChange(i)}
        >
          {Rating >= i ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  };

  return (
    <div style={{ backgroundColor: '#ECF0F5'}}>
      <Header/>
      <div className="d-flex mt-10 mb-10 justify-content-center align-items-center">
        <div className="w-50 bg-white shadow rounded-3 p-3">
          <h2> Create Feedback</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-2">
              <label htmlFor="Name">Name : </label>
              <input
                type="text"
                id="Name"
                name="Name"
                placeholder="Enter Name"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Name}
              />
              {formik.touched.Name && formik.errors.Name ? (
                <div className="error">{formik.errors.Name}</div>
              ) : null}
            </div>
            <div className="mb-2">
              <label htmlFor="Email">Email : </label>
              <input
                type="text"
                id="Email"
                name="Email"
                placeholder="Enter Email"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Email}
              />
              {formik.touched.Email && formik.errors.Email ? (
                <div className="error">{formik.errors.Email}</div>
              ) : null}
            </div>
            <div className="mb-2">
              <label htmlFor="Teacher">Teacher : </label>
              <input
                type="text"
                id="Teacher"
                name="Teacher"
                placeholder="Enter Teacher Name"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Teacher}
              />
              {formik.touched.Teacher && formik.errors.Teacher ? (
                <div className="error">{formik.errors.Teacher}</div>
              ) : null}
            </div>
            <div className="mb-2">
              <label htmlFor="Feedback">Feedback : </label>
              <textarea
                id="Feedback"
                name="Feedback"
                placeholder="Enter Your Feedback"
                className="form-control"
                rows="4"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Feedback}
              />
              {formik.touched.Feedback && formik.errors.Feedback ? (
                <div className="error">{formik.errors.Feedback}</div>
              ) : null}
            </div>
            <div className="mb-2">
              <label>Rating: </label>
              {renderStars()}
              {formik.touched.Rating && formik.errors.Rating ? (
                <div className="error">{formik.errors.Rating}</div>
              ) : null}
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>  
  );
}

export default CreateUser;

import React, { useState } from "react";
import axios from "axios";
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Header from '../../Exam Platform and Leaderboard/components/Header';
import Footer from '../../Exam Platform and Leaderboard/components/Footer';
import SideNavbar from '../component/SideNavbar';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput
} from 'mdb-react-ui-kit';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const TCreate = () => {
    

    // District
    const districts = [
        "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle",
        "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle",
        "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Moneragala",
        "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura",
        "Trincomalee", "Vavuniya"
    ];

    const [formData, setFormData] = useState({
        tfirstName: "",
        tlastName: "",
        tnicNumber: "",
        tSubject: "",
        tDistrict: "",
        tEdu: [],
        tInfo: "",
        tAddress: "",
        tPhone: "",
        tEmail: "",
        password: "",
        confirmPassword: "",
        teacherPhoto: null
    });

    const validationSchema = Yup.object().shape({
        tfirstName: Yup.string().required('First Name is required'),
        tlastName: Yup.string().required('Last Name is required'),
        tnicNumber: Yup.string().matches(/^(([0-9]{9}[vVxX])|([12]\d{11}))$/, 'Enter Correct NIC number'),
        tSubject: Yup.string().required('Subject is required'),
        tDistrict: Yup.string().required('District is required'),
        tEdu: Yup.array().required('Education Qualification is required').min(1, 'Select at least one qualification'),
        tInfo: Yup.string(),
        tAddress: Yup.string().required('Address is required'),
        tPhone: Yup.string().matches(/^\d{10}$/, 'Invalid phone number').required('Phone Number is required'),
        tEmail: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    });

    const handleSubmit = async (values) => {
        try {
            const formDataToSend = new FormData();
            for (const key in values) {
                formDataToSend.append(key, values[key]);
            }

            await axios.post("http://localhost:8081/teacher/add", formDataToSend);
            alert("Teacher added successfully")
            window.location.reload();
        } catch (error) {
            console.error("Error adding teacher:", error);
            alert("Exist Email Address or Nic Number");
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, teacherPhoto: file });
    };

    return (
        <div style={{ backgroundColor: '#ECF0F5' }}>
        <div>
        <Header />

        <MDBContainer fluid className='h-custom'>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12' className='m-5'>
                    <MDBCard className='card-registration card-registration-2' style={{ borderRadius: '15px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
                        <Formik
                            initialValues={formData}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {(formik) => (
                                <Form onSubmit={formik.handleSubmit}>
                                    <MDBCardBody className='p-0'>
                                        <MDBRow>
                                            <MDBCol md='6' className='p-5'>
                                                <h3 className="fw-normal mb-5" style={{ color: '#4835d4' }}>General Information</h3>
                                                <ErrorMessage name="tfirstName" component="div" className="text-danger" />
                                                <Field
                                                name="tfirstName"
                                                type="text"
                                                as={MDBInput}
                                                wrapperClass='mb-4'
                                                label='First Name'
                                                size='medium'
                                                id='tfirstName'
                                                onKeyPress={(e) => {
                                                    const regex = /^[a-zA-Z\s]*$/; // Regex to match only alphabets and spaces
                                                    if (!regex.test(e.key)) {
                                                        e.preventDefault(); // Prevent the input of characters other than alphabets and spaces
                                                    }
                                                }}
/>
                                                
                                                <ErrorMessage name="tlastName" component="div" className="text-danger" />
                                                <Field
                                                    name="tlastName"
                                                    type="text"
                                                    as={MDBInput}
                                                    wrapperClass='mb-4'
                                                    label='Last Name'
                                                    size='medium'
                                                    id='tlastName'
                                                    onKeyPress={(e) => {
                                                        const regex = /^[a-zA-Z\s]*$/; // Regex to match only alphabets and spaces
                                                        if (!regex.test(e.key)) {
                                                            e.preventDefault(); // Prevent the input of characters other than alphabets and spaces
                                                        }
                                                    }}
                                                    
                                                />
                                                
                                                <ErrorMessage name="tnicNumber" component="div" className="text-danger" />
                                                <Field
                                                name="tnicNumber"
                                                type="text"
                                                as={MDBInput}
                                                wrapperClass='mb-4'
                                                label='NIC - Number'
                                                size='medium'
                                                id='tnicNumber'
                                                onKeyPress={(e) => {
                                                    const allowedChars = [/[0-9]/, 'v', 'V', 'x', 'X']; // Array of allowed characters
                                                    if (!allowedChars.some(regex => (typeof regex === 'string' && regex === e.key) || (typeof regex === 'object' && regex.test(e.key)))) {
                                                        e.preventDefault(); // Prevent the input of characters other than numbers, 'v', 'V', 'x', 'X'
                                                    }
                                                }}
                                                
                                                
/>

                                               
                                                <div className="mb-4 mt-2">
                                                <ErrorMessage name="tSubject" component="div" className="text-danger" />
                                                    <Field
                                                        name="tSubject"
                                                        as="select"
                                                        className="form-select"
                                                        id="tSubject"
                                                        wrapperClass='mb-4 mt-2'
                                                    >
                                                        <option value="">Select the Subject</option>
                                                        <option value="Commerce(O/L)">Commerce(O/L)</option>
                                                        <option value="Accounting(A/L)">Accounting(A/L)</option>
                                                        <option value="Business Studies(A/L)">Business Studies(A/L)</option>
                                                        <option value="Economics(A/L)">Economics(A/L)</option>
                                                        <option value="Business Statistics(A/L)">Business Statistics(A/L)</option>
                                                    </Field>
                                                   
                                                </div>
                                                <div className="mb-4 mt-2">
                                                <ErrorMessage name="tDistrict" component="div" className="text-danger" />
                                                    <Field
                                                        name="tDistrict"
                                                        as="select"
                                                        className="form-select"
                                                        id="tDistrict"
                                                        wrapperClass='mb-4 mt-2'
                                                    >
                                                        <option value="">Select the District</option>
                                                        {districts.map((district, index) => (
                                                            <option key={index} value={district}>{district}</option>
                                                        ))}
                                                    </Field>
                                                    
                                                </div>
                                                <div className="mb-4 mt-2">
                                                <ErrorMessage name="tEdu" component="div" className="text-danger" />
                                                    <Field
                                                        name="tEdu"
                                                        as="select"
                                                        multiple
                                                        className="form-select"
                                                        id="tEdu"
                                                        wrapperClass='mb-4 mt-2'
                                                    >
                                                        <option value="">Select Education Qualification(s)</option>
                                                        <option value="O/L">O/L</option>
                                                        <option value="A/L">A/L</option>
                                                        <option value="Degree">Degree</option>
                                                        <option value="Diploma">Diploma</option>
                                                        <option value="Certificate">Certificate</option>
                                                    </Field>
                                                    
                                                </div>
                                                <Field
                                                name="tInfo"
                                                type="text"
                                                as={MDBInput}
                                                wrapperClass='mb-4'
                                                label='Additional Information'
                                                size='medium'
                                                id='tInfo'
                                                onKeyPress={(e) => {
                                                    const regex = /^[a-zA-Z\s]*$/; // Regex to match only alphabets and spaces
                                                    if (!regex.test(e.key)) {
                                                        e.preventDefault(); // Prevent the input of characters other than alphabets and spaces
                                                    }
                                                }}
/>

                                            </MDBCol>
                                            <MDBCol md='6' className='p-5 bg-info border border-primary rounded-end-custom'>
                                                <h3 className="fw-normal mb-5" style={{ color: '#4835d4' }}>Contact Details</h3>
                                                <ErrorMessage name="tAddress" component="div" className="text-danger" />
                                                <Field
                                                    name="tAddress"
                                                    type="text"
                                                    as={MDBInput}
                                                    wrapperClass='mb-4'
                                                    label='Address'
                                                    size='medium'
                                                    id='tAddress'
                                                    onKeyPress={(e) => {
                                                        const regex = /^[a-zA-Z\s]*$/; // Regex to match only alphabets and spaces
                                                        if (!regex.test(e.key)) {
                                                            e.preventDefault(); // Prevent the input of characters other than alphabets and spaces
                                                        }
                                                    }}
                                                />
                                                
                                                <ErrorMessage name="tPhone" component="div" className="text-danger" />
                                                <Field
                                                    name="tPhone"
                                                    type="text"
                                                    as={MDBInput}
                                                    wrapperClass='mb-4'
                                                    label='Phone Number'
                                                    size='medium'
                                                    id='tPhone'
                                                    onKeyPress={(e) => {
                                                        const isNumeric = /^[0-9]*$/; // Regex to match only numeric characters
                                                        if (!isNumeric.test(e.key)) {
                                                            e.preventDefault(); // Prevent the input of characters other than numeric characters
                                                        }
                                                    }}
                                                />
                                               
                                                <ErrorMessage name="tEmail" component="div" className="text-danger" />
                                                <Field
                                                    name="tEmail"
                                                    type="email"
                                                    as={MDBInput}
                                                    wrapperClass='mb-4'
                                                    label='Your Email'
                                                    size='medium'
                                                    id='tEmail'
                                                    onKeyPress={(e) => {
                                                        const validChars = /^[a-zA-Z0-9@.]*$/; // Regex to match only valid email characters
                                                        if (!validChars.test(e.key)) {
                                                            e.preventDefault(); // Prevent the input of characters other than valid email characters
                                                        }
                                                    }}
                                                />
                                                
                                                <ErrorMessage name="password" component="div" className="text-danger" />
                                                <Field
                                                    name="password"
                                                    type="password"
                                                    as={MDBInput}
                                                    wrapperClass='mb-4'
                                                    label='Password'
                                                    size='medium'
                                                    id='password'
                                                />
                                                
                                                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                                                <Field
                                                    name="confirmPassword"
                                                    type="password"
                                                    as={MDBInput}
                                                    wrapperClass='mb-4'
                                                    label='Confirm Password'
                                                    size='medium'
                                                    id='confirmPassword'
                                                />
                                                
                                                <div className="mb-4">
                                                    <label htmlFor="teacherPhoto" className="form-label">Upload Photo</label>
                                                    <input className="form-control" type="file" id="teacherPhoto" accept="image/*" onChange={handlePhotoChange} />
                                                </div>
                                                <div className="d-flex justify-content-center">
                                                    <button type="submit" className="btn btn-primary mt-5">Add Teacher</button>
                                                </div>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                </Form>
                            )}
                        </Formik>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>

        </div>
        <Footer />
        </div>
    );
};

export default TCreate;

import React, { useState } from "react";
import axios from "axios";
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import styles from '../styles/TCreate.css';
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

const TCreate = () => {
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
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "tEdu") {
            // If tEdu is an array, handle multiple selections
            const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
            setFormData({ ...formData, [name]: selectedOptions });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        setErrors({ ...errors, [name]: "" });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, teacherPhoto: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const formDataToSend = new FormData();
                for (const key in formData) {
                    formDataToSend.append(key, formData[key]);
                }

                await axios.post("http://localhost:8081/teacher/add", formDataToSend);
                alert("Teacher added successfully")
                window.location.reload();
            } catch (error) {
                console.error("Error adding teacher:", error);
                alert("An error occurred while adding the teacher");
            }
        } else {
            alert("Please fill in all required fields with valid Sri Lankan teacher information");
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // NIC Number Validation
        const nicRegex = /^(([0-9]{9}[vVxX])|([12]\d{11}))$/;
        if (!nicRegex.test(formData.tnicNumber)) {
            newErrors.tnicNumber = "Enter Correct NIC number";
            isValid = false;
        }


        // District Validation
        if (!formData.tDistrict || !districts.includes(formData.tDistrict)) {
            newErrors.tDistrict = "Please select a district";
            isValid = false;
        }

        // Education Qualification Validation
        if (formData.tEdu.length === 0) {
            newErrors.tEdu = "Please select at least one education qualification";
            isValid = false;
        }

        // Phone Number Validation
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.tPhone)) {
            newErrors.tPhone = "Invalid phone number";
            isValid = false;
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.tEmail)) {
            newErrors.tEmail = "Invalid email address";
            isValid = false;
        }

        // Password Validation
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }
        if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    return (
        <div>
        
        <div> 
            <Header />
           

            

        
        <MDBContainer fluid className='h-custom'>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12' className='m-5'>
                    <MDBCard className='card-registration card-registration-2' style={{ borderRadius: '15px' }}>
                        <form onSubmit={handleSubmit}>
                            <MDBCardBody className='p-0'>
                                <MDBRow>
                                    <MDBCol md='6' className='p-5 bg-white'> {/* Corrected className here */}
                                        <h3 className="fw-normal mb-5" style={{ color: '#4835d4' }}>General Information</h3>
                                        <MDBInput wrapperClass='mb-4' label='First Name' size='medium' name='tfirstName' id='tfirstName' type='text' value={formData.tfirstName} onChange={handleChange} error={errors.tfirstName} />
                                        <MDBInput wrapperClass='mb-4' label='Last Name' size='medium' name='tlastName' id='tlastName' type='text' value={formData.tlastName} onChange={handleChange} error={errors.tlastName} />
                                        {errors.tnicNumber && <div className="text-danger">{errors.tnicNumber}</div>}
                                        <MDBInput wrapperClass='mb-4' label='NIC - Number' size='medium' name='tnicNumber' id='tnicNumber' type='text' value={formData.tnicNumber} onChange={handleChange} error={errors.tnicNumber} />
                                        
                                        <div className="mb-4 mt-2">
                                            <select className="form-select" name='tSubject' id="tSubject" aria-label="Subject" value={formData.tSubject} onChange={handleChange} error={errors.tSubject}>
                                                <option value="">Select the Subject</option>
                                                <option value="Commerce(O/L)">Commerce(O/L)</option>
                                                <option value="Accounting(A/L)">Accounting(A/L)</option>
                                                <option value="Business Studies(A/L)">Business Studies(A/L)</option>
                                                <option value="Economics(A/L)">Economics(A/L)</option>
                                                <option value="Business Statistics(A/L)">Business Statistics(A/L)</option>
                                            </select>
                                            <label htmlFor="tSubject" className="form-label">Subject</label>
                                        </div>
                                        <div className="mb-4 mt-2">
                                        {errors.tDistrict && <div className="text-danger">{errors.tDistrict}</div>}
                                            <select className="form-select" name='tDistrict' id="tDistrict" aria-label="District" value={formData.tDistrict} onChange={handleChange} error={errors.tDistrict}>
                                                <option value="">Select the District</option>
                                                {districts.map((district, index) => (
                                                    <option key={index} value={district}>{district}</option>
                                                ))}
                                            </select>
                                           
                                            <label htmlFor="tDistrict" className="form-label">District</label>
                                        </div>
                                      
                                        {errors.tEdu && <div className="text-danger">{errors.tEdu}</div>}
                                        <div className="mb-4 mt-2">
                                            <label htmlFor="tEdu" className="form-label">Education Qualification</label>
                                            <select multiple className="form-select" name='tEdu' id="tEdu" aria-label="Education Qualification" value={formData.tEdu} onChange={handleChange} error={errors.tEdu}>
                                                <option value="">Select Education Qualification(s)</option>
                                                <option value="O/L">O/L</option>
                                                <option value="A/L">A/L</option>
                                                <option value="Degree">Degree</option>
                                                <option value="Diploma">Diploma</option>
                                                <option value="Certificate">Certificate</option>
                                            </select>
                                        </div>
                                        
                                        <MDBInput wrapperClass='mb-4' label='Additional Information' size='medium' name='tInfo' id='tInfo' type='text' value={formData.tInfo} onChange={handleChange} error={errors.tInfo} />
                                    </MDBCol>
                                    <MDBCol md='6' className='bg-blue p-5'>
                                        <h3 className="fw-normal mb-5 text-white" style={{ color: '#4835d4' }}>Contact Details</h3>
                                        <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Address' size='medium' name='tAddress' id='tAddress' type='text' value={formData.tAddress} onChange={handleChange} error={errors.tAddress} />
                                       
                                        {errors.tPhone && <div className="text-danger">{errors.tPhone}</div>}
                                        <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Phone Number' size='medium' name='tPhone' id='tPhone' type='text' value={formData.tPhone} onChange={handleChange} error={errors.tPhone} />
                                        
                                        {errors.tEmail && <div className="text-danger">{errors.tEmail}</div>}
                                        <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Your Email' size='medium' name='tEmail' id='tEmail' type='email' value={formData.tEmail} onChange={handleChange} error={errors.tEmail} />
                                        
                                        {errors.password && <div className="text-danger">{errors.password}</div>}
                                        <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Password' size='medium' name='password' id='password' type='password' value={formData.password} onChange={handleChange} error={errors.password} />
                                       
                                        {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}        
                                        <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Confirm Password' size='medium' name='confirmPassword' id='confirmPassword' type='password' value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
                                        <div className="mb-4">
                                            <label htmlFor="teacherPhoto" className="form-label text-white">Upload Photo</label>
                                            <input className="form-control" type="file" id="teacherPhoto" accept="image/*" onChange={handlePhotoChange} />
                                        </div>
                                        <button type="submit" className="btn btn-light btn-md">Add Teacher</button>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </form>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
        </div>
        </div>

    );
};

export default TCreate;

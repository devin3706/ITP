import React, { useState } from "react";
import axios from "axios";
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import styles from '../styles/TCreate.css';
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
    const [formData, setFormData] = useState({
        tfirstName: "",
        tlastName: "",
        tnicNumber: "",
        tSubject: "",
        tDistrict: "",
        tEdu: "",
        tInfo: "",
        tAddress: "",
        tPhone: "",
        tEmail: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error when user starts typing
        setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await axios.post("http://localhost:8081/teacher/add", formData);
                alert("Teacher added successfully")
            } catch (error) {
                console.error("Error adding teacher:", error);
                alert("An error occurred while adding the teacher");
            }
        } else {
            alert("Please fill in all required fields");
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // Check if any field is empty
        for (const key in formData) {
            if (!formData[key]) {
                newErrors[key] = "This field is required";
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    return (
        <MDBContainer fluid className='h-custom'>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12' className='m-5'>
                    <MDBCard className='card-registration card-registration-2' style={{ borderRadius: '15px' }}>
                        <form onSubmit={handleSubmit}>
                            <MDBCardBody className='p-0'>
                                <MDBRow>
                                    <MDBCol md='6' className='p-5 bg-wight'>
                                        <h3 className="fw-normal mb-5" style={{ color: '#4835d4' }}>General Information</h3>
                                        <MDBInput wrapperClass='mb-4' label='First Name' size='medium' name='tfirstName' id='tfirstName' type='text' value={formData.tfirstName} onChange={handleChange} error={errors.tfirstName} />
                                        <MDBInput wrapperClass='mb-4' label='Last Name' size='medium' name='tlastName' id='tlastName' type='text' value={formData.tlastName} onChange={handleChange} error={errors.tlastName} />
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
                                        <MDBInput wrapperClass='mb-4' label='District' size='medium' name='tDistrict' id='tDistrict' type='text' value={formData.tDistrict} onChange={handleChange} error={errors.tDistrict} />
                                        <MDBInput wrapperClass='mb-4' label='Education Qualification' size='medium' name='tEdu' id='tEdu' type='text' value={formData.tEdu} onChange={handleChange} error={errors.tEdu} />
                                        <MDBInput wrapperClass='mb-4' label='Additional Information' size='medium' name='tInfo' id='tInfo' type='text' value={formData.tInfo} onChange={handleChange} error={errors.tInfo} />
                                    </MDBCol>
                                    <MDBCol md='6' className='bg-blue p-5'>
                                        <h3 className="fw-normal mb-5 text-white" style={{ color: '#4835d4' }}>Contact Details</h3>
                                        <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Address' size='medium' name='tAddress' id='tAddress' type='text' value={formData.tAddress} onChange={handleChange} error={errors.tAddress} />
                                        <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Phone Number' size='medium' name='tPhone' id='tPhone' type='text' value={formData.tPhone} onChange={handleChange} error={errors.tPhone} />
                                        <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Your Email' size='medium' name='tEmail' id='tEmail' type='email' value={formData.tEmail} onChange={handleChange} error={errors.tEmail} />
                                        <MDBBtn type="submit" color='light' size='medium'>Add Teacher</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                                
                            </MDBCardBody>
                        </form>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default TCreate;

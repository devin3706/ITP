import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Header from '../../Exam Platform and Leaderboard/components/Header';
import Footer from '../../Exam Platform and Leaderboard/components/Footer';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput
} from 'mdb-react-ui-kit';

const TUpdate = () => {
const districts = [
        "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle",
        "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle",
        "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Moneragala",
        "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura",
        "Trincomalee", "Vavuniya"
    ];

    const { id } = useParams(); // Get the ID from the URL params
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
        tEmail: "",
        teacherPhoto: null
    });
    const [errors, setErrors] = useState({}); // Define the errors state

    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/teacher/get/${id}`);
                const teacherData = response.data.teacher;
                setFormData({
                    tfirstName: teacherData.firstName,
                    tlastName: teacherData.lastName,
                    tnicNumber: teacherData.nicNumber,
                    tSubject: teacherData.subject,
                    tDistrict: teacherData.district,
                    tEdu: teacherData.eduQualification,
                    tInfo: teacherData.additionalInfo,
                    tAddress: teacherData.address,
                    tPhone: teacherData.phoneNumber,
                    tEmail: teacherData.email,
                });
            } catch (error) {
                console.error("Error fetching teacher data:", error);
            }
        };

        fetchTeacherData();
    }, [id]); // Fetch data whenever the ID changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("Name:", name);
        console.log("Value:", value);
        if (name === "tEdu") {
            // If tEdu is an array, handle multiple selections
            const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
            console.log("Selected Options:", selectedOptions);
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
                // Remove confirmPassword field before sending data to the server
                const { confirmPassword, ...dataToSend } = formData;
                await axios.put(`http://localhost:8081/teacher/update/${id}`, dataToSend);
                alert("Teacher updated successfully");

                
            } catch (error) {
                console.error("Error updating teacher:", error);
                alert("An error occurred while updating the teacher");
            }
        } else {
            alert("Please fill in all required fields");
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

        

        setErrors(newErrors);
        return isValid;
    };

    return (
        <div style={{ backgroundColor: '#ECF0F5' }}>
        <div>
        <Header />

        <MDBContainer fluid className='h-custom'>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12' className='m-5'>
                    <MDBCard className='card-registration card-registration-2' style={{ borderRadius: '15px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
                        <form onSubmit={handleSubmit}>
                            <MDBCardBody className='p-0'>
                                <MDBRow>
                                    <MDBCol md='6' className='p-5'>
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
                                    <MDBCol md='6' className='p-5 bg-info border border-primary rounded-end-custom'>
                                        <h3 className="fw-normal mb-5" style={{ color: '#4835d4' }}>Contact Details</h3>
                                        <MDBInput wrapperClass='mb-4' label='Address' size='medium' name='tAddress' id='tAddress' type='text' value={formData.tAddress} onChange={handleChange} error={errors.tAddress} />
                                        {errors.tPhone && <div className="text-danger">{errors.tPhone}</div>}
                                        <MDBInput wrapperClass='mb-4' label='Phone Number' size='medium' name='tPhone' id='tPhone' type='text' value={formData.tPhone} onChange={handleChange} error={errors.tPhone} />
                                        {errors.tEmail && <div className="text-danger">{errors.tEmail}</div>}
                                        <MDBInput wrapperClass='mb-4' label='Your Email' size='medium' name='tEmail' id='tEmail' type='email' value={formData.tEmail} onChange={handleChange} error={errors.tEmail} />
                                       
                                        <div className="mb-4">
                                            <label htmlFor="teacherPhoto" className="form-label">Upload Photo</label>
                                            <input className="form-control" type="file" id="teacherPhoto" accept="image/*" onChange={handlePhotoChange} />
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button type="submit" className="btn btn-primary mt-5">Update Teacher</button>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </form>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>

        </div>
        <Footer />
        </div>
    );
};

export default TUpdate;

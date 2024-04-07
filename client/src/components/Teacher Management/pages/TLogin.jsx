import React, { useState } from "react";
import styles from '../styles/TLogin.css';

//design
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox  
} from 'mdb-react-ui-kit';




const TLogin = () => {

//form states

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const  [showPassword, setShowPassword] = useState(false);



    return(
        <MDBContainer fluid className="p-3 my-5">
            <MDBRow>
                <MDBCol col='10' md='6'>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
                </MDBCol>
                <MDBCol col='4' md='6'>
                <MDBInput wrapperClass='mb-4' label='Email address' id='logName' type='email' />
                <MDBInput wrapperClass='mb-4' label='Password' id='logPassword' type='password'/>
                    <div className="d-flex justify-content-between mx-4 mb-4">
                        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                        <a href="">Forgot password?</a>
                    </div>

                    {/*<MDBBtn className="mb-4 w-100" size="lg" type="submit">Sign in</MDBBtn> */}

                    <div class="col-12">
                        <button class="btn btn-primary mb-4 w-100" size="lg" id='logSubmit' type="submit" >Sign in</button>
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default TLogin;
import axios from "axios";
import { useNavigate } from "react-router";
import { BASE_API_URL } from "../App";
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn,
    MDBCard,
    MDBContainer,

} from 'mdb-react-ui-kit';
import { toast } from "react-toastify";
import { useState } from "react";
import './login-register.css';


export default function RegisterForm() {

    let navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
    });


    async function register() {
        await axios.post(BASE_API_URL + "users/register", formValues)
            .then(response => {
                console.log(response);
            })
            .finally(navigate("/login"));
    };

    function handleSubmit(e) {
        e.preventDefault();

        if (validValues()) {
            register();
        } else {
            toast.error('Something went wrong, please try again!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        };
    };

    const handleChange = (e) => {
        e.persist();
        setFormValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    };

    function validValues() {
        if (formValues.username.length <= 0 || formValues.password.length <= 0) {
            return false;
        };
        return true;
    };

    return (
        <>
            <MDBContainer>
                <MDBCard style={{ margin: '10%' }}>
                    <form style={{ margin: '1%' }} onSubmit={handleSubmit}>
                        <div className='login-data'>
                            <MDBInput onChange={handleChange} className='mb-4' name="username" type='text' id='form2Example1' label='Username' />
                            <MDBInput onChange={handleChange} className='mb-4' name="email" type='email' id='form2Example1' label='Email' />
                            <MDBInput onChange={handleChange} className='mb-4' name="password" type='password' id='form2Example1' label='Password' />
                            <MDBInput onChange={handleChange} className='mb-4' name="confirmPassword" type='password' id='form2Example2' label='Confirm-Password' />
                        </div>
                        <MDBBtn color="success" id="login-button" type='submit' className='mb-4'>
                            Sing in
                        </MDBBtn>

                        <div className='text-center'>
                            <p>
                                Already a member? <a href='/login'>Login</a>
                            </p>
                        </div>
                    </form>
                </MDBCard>
            </MDBContainer>
        </>
    );
};
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
import './login-register.css';
import { toast } from "react-toastify";
import { useState } from "react";

export default function LoginForm({ setActiveUser }) {

    let navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (validValues()) {
            login();
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

    const [formValues, setFormValues] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        e.persist();
        setFormValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    };

    function redirect(status, username) {
        if (status === 200) {
            console.log(username);
            setActiveUser(username);
            navigate("/");
        };
    };

    function validValues() {
        if (formValues.username.length <= 0 || formValues.password.length <= 0) {
            return false;
        };
        return true;
    };

    async function login() {
        await axios.post(BASE_API_URL + "users/login", formValues)
            .then(response => {
                console.log(response.data);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("userId", response.data.userId);
                toast('Successfully Logged In', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                redirect(response.status, response.data.username);
            })
            .catch(function (error) {
                toast.error('Something went wrong, please try again!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                redirect(error.response.data.status);
            });
    };


    return (
        <>
            <MDBContainer>
                <MDBCard style={{ margin: '10%' }}>
                    <form style={{ margin: '1%' }} onSubmit={handleSubmit}>
                        <div className='login-data'>
                            <MDBInput onChange={handleChange} className='mb-4' name="username" type='text' id='form2Example1' label='Username' />
                            <MDBInput onChange={handleChange} className='mb-4' name="password" type='password' id='form2Example2' label='Password' />
                        </div>
                        <MDBRow className='mb-4'>
                            <MDBCol className='d-flex justify-content-center'>
                                <MDBCheckbox id='form2Example3' label='Remember me' defaultChecked />
                            </MDBCol>
                        </MDBRow>

                        <MDBBtn color="success" id="login-button" type='submit' className='mb-4'>
                            Login
                        </MDBBtn>

                        <div className='text-center'>
                            <p>
                                Not a member? <a href='/register'>Register</a>
                            </p>
                        </div>
                    </form>
                </MDBCard>
            </MDBContainer>
        </>
    );
};
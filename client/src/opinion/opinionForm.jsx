import axios from "axios";
import { BASE_API_URL } from "../App";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import {
    MDBBtn,
    MDBContainer,
    MDBTextArea,
    MDBCard,
    MDBCardBody,
    MDBCardText,

} from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';
import "./opinionForm.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OpinionForm() {

    let navigate = useNavigate();
    const { id, opinionId } = useParams();

    const [formValues, setFormValues] = useState({
        description: '',
        feeling: 'HAPPY'
    });


    const handleChange = (e) => {
        e.persist();
        setFormValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (validValues()) {
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
        }
    };

    function validValues() {
        if (formValues.description.length <= 0 || formValues.feeling.length <= 0) {
            return false;
        };
        return true;
    };

    const options = [
        { value: 'HAPPY', label: 'Happy 😄' },
        { value: 'SAD', label: 'Sad 🙁' },
        { value: 'ANGRY', label: 'ANGRY 😡' },
        { value: 'EXCITED', label: 'EXCITED 🤩' },
        { value: 'CONFUSED', label: 'CONFUSED 🤨' },
        { value: 'WONDERING', label: 'WONDERING 🤔' },
    ];

    const formChildsStyle = {
        margin: '1%'
    };

    const submitButtonStyle = {
        marginTop: "1%",
        marginBottom: "1%"
    }

    const selectStyle = {
        display: 'flex',
        justifyContent: 'center'
    }

    useEffect(() => {
    }, []);

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <MDBContainer>
                <MDBCard style={{ margin: '10%' }}>
                    <MDBCardBody>
                        <MDBCardText>
                            <form style={{ textAlign: 'center', margin: '1%' }} onSubmit={handleSubmit}>
                                <MDBTextArea style={formChildsStyle} onChange={handleChange} name="description" label='Message' id='textAreaExample' rows={4} />
                                <label style={formChildsStyle}> How do you feel about this campaign? </label>
                                <div style={selectStyle}>
                                    <Form.Select onChange={handleChange} name="feeling" className="opinion-select" style={formChildsStyle} aria-label="Default select example">
                                        {options.map((option, index) => {
                                            return (
                                                <option key={index} value={option.value}>{option.label}</option>
                                            )
                                        })}
                                    </Form.Select>
                                </div>
                                <MDBBtn style={submitButtonStyle} color="success" type='submit' className='mb-4'>
                                    Post
                                </MDBBtn>
                            </form>
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>

            </MDBContainer>
        </>
    );
};
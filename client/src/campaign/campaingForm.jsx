import axios from "axios";
import { BASE_API_URL } from "../App";
import { useNavigate, useParams } from "react-router";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import {
    MDBInput,
    MDBBtn,
    MDBContainer,
    MDBTextArea,
    MDBCard,
    MDBCardBody,
    MDBCardText,

} from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';


export default function CampaignForm(props) {

    let navigate = useNavigate();
    const { id } = useParams();
    const [formValues, setFormValues] = useState({
        name: '',
        description: '',
        targetValue: 0.0,
        currency: 'RON'
    });

    const options = [
        { value: 'RON', label: 'Romainian Leu' },
        { value: 'EUR', label: 'Euro' },
        { value: 'USD', label: 'US Dollar' },
    ];

    const formChildrenStyle = {
        margin: '1%'
    }

    const selectStyle = {
        display: 'flex',
        justifyContent: 'center'
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (validValues()) {
            if (props.update) {
                // updateOpinion();
            } else {
                addCampaign();
            }
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

    async function addCampaign() {
        await axios.post(BASE_API_URL + "campaigns/add-campaign/" + localStorage.getItem("userId"),
            formValues,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem("token")
                }
            }
        ).then((response) => { console.log(response.config.data) })
            .then(toast.success('Campaign Added!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            ).finally(navigate("/campaigns"));
    };

    function validValues() {
        if (formValues.name.length <= 0 ||
            formValues.description.length <= 0 ||
            formValues.currency.length <= 0 ||
            formValues.targetValue.length <= 0) {
            return false;
        };
        return true;
    };

    const handleChange = (e) => {
        e.persist();
        setFormValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <>
            <MDBContainer>
                <MDBCard style={{ margin: '10%' }}>
                    <MDBCardBody>
                        <MDBCardText>
                            <form style={{ textAlign: 'center', margin: '1%' }} onSubmit={handleSubmit} >
                                <MDBInput style={formChildrenStyle} onChange={handleChange} name="name" className='mb-4' type='text' id='form2Example1' label='Title' />

                                <MDBTextArea style={formChildrenStyle} onChange={handleChange} name="description" label='Message' id='textAreaExample' rows={4} />
                                <div className="targetValue" style={{ width: '50%', marginLeft: '25%', marginTop: '5%' }}>
                                    <MDBInput style={formChildrenStyle} onChange={handleChange} name="targetValue" className='mb-4' type='number' id='targetValue' label='Target Value' />
                                </div>

                                <div style={selectStyle}>
                                    <Form.Select style={formChildrenStyle} onChange={handleChange} name="currency" className="opinion-select" aria-label="Default select example">
                                        {options.map((option, index) => {
                                            return (
                                                <option key={index} value={option.value}>{option.label}</option>
                                            )
                                        })}
                                    </Form.Select>
                                </div>
                                <MDBBtn color="success" type='submit' className='mb-4'>
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
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../App";
import photo from "../image/card_image.jpg";
import OpinionCard from '../opinion/opinionCard';

import {
    MDBBtn,
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardFooter,
    MDBCardHeader,
    MDBProgress,
    MDBProgressBar,
    MDBRow,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,

} from 'mdb-react-ui-kit';
import PaymentCard from "../payment/paymentCard";


export default function CampaignDetails() {

    let navigate = useNavigate();
    const [campaign, setCampaign] = useState([]);
    const { id } = useParams();
    const [opinions, setOpinions] = useState([]);
    const [targetValue, setTargetValue] = useState();
    const [currentValue, setCurrentValue] = useState();
    const [user, setUser] = useState();
    const [percent, setPercent] = useState(0);
    const [payments, setPayments] = useState([]);
    const [campaignUserId, setCampaingUserId] = useState();

    const [centredModal, setCentredModal] = useState(false);
    const toggleShow = () => setCentredModal(!centredModal);


    async function getUser() {
        await axios(BASE_API_URL + "campaigns/get-user-by-campaign/" + id)
            .then((response) => {
                setUser(response.data);
                setCampaingUserId(response.data.id);
            });
    }


    function redirect() {
        navigate("add-opinion?campaignUserId=" + user.id)
        window.scroll(0, 0)
    }


    async function deleteCampaign() {
        await axios.delete(BASE_API_URL + "campaigns/delete-campaign/" + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                console.log(response);
            })
            .finally(navigate("/campaigns"));
    };


    function updateCampaign() {
        navigate("/campaigns/update-campaign/" + id)
    };


    function calculateDifference(num1, num2) {
        setPercent((num2 / num1) * 100);
    };

    async function getCampaignData() {
        await axios(BASE_API_URL + "campaigns/campaign/" + id)
            .then((response) => {
                setCampaign(response.data);
                setOpinions(response.data.opinionList);
                setTargetValue(response.data.targetValue.toLocaleString('en-US'));
                setCurrentValue(response.data.currentValue.toLocaleString('en-US'));
                setPayments(response.data.payments);
                calculateDifference(response.data.targetValue, response.data.currentValue);
            });
    };

    useEffect(() => {
        getCampaignData();
        getUser();
        calculateDifference(campaign.targetValue, campaign.currentValue);
    }, []);

    console.log(campaign)
    const paymentCardStyle = {
        width: '75%',
        textAlign: 'center',
        left: '12%',
        marginTop: '1%'
    };

    function redirectToPayment() {
        navigate("payment?value=" + 1000 + "&currency=" + campaign.currency);
    };

    return (
        <>
            <MDBBtn onClick={toggleShow}>Vertically centered modal</MDBBtn>

            <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader style={{ backgroundColor: 'rgb(57, 192, 237)', color: 'white' }}>
                            <MDBModalTitle>Hold up!</MDBModalTitle>
                            <MDBBtn className='btn-close' color='light' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <p>
                                You are about to delete this campaign, are you sure ?
                            </p>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='success' onClick={toggleShow}>
                                NO!
                            </MDBBtn>
                            <MDBBtn color="danger" onClick={deleteCampaign}>Yes!</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <MDBContainer style={{ textAlign: 'center', marginTop: '1%', marginBottom: '1%' }}>
                <MDBRow>
                    <MDBCol md='8'>
                        <MDBCard>
                            <MDBCardImage position='top' src={photo} alt='...' />
                            <MDBCardBody>
                                <MDBCardHeader className="h2">{campaign.name}</MDBCardHeader>
                                <MDBCardText style={{ margin: '3%' }}>
                                    {campaign.description}
                                </MDBCardText>
                                <MDBCardFooter>
                                    <MDBContainer>
                                        <MDBRow style={{ alignItems: 'center' }}>
                                            <MDBCol size='md' className='col-example'>
                                                Posted at: {campaign.submissionTime}
                                            </MDBCol>
                                            <MDBCol size='md' className='col-example'>
                                                <MDBBtn size="lg" style={{ margin: '1%' }} rounded color='success' href="#payment"> Payment </MDBBtn>
                                                {
                                                    user ? user.id == localStorage.getItem("userId") && (
                                                        <>
                                                            <MDBBtn onClick={updateCampaign} size="lg" rounded color='info' style={{ margin: '1%' }}>Update</MDBBtn>
                                                            <MDBBtn onClick={toggleShow} size="lg" rounded color='danger' style={{ margin: '1%' }}>Delete</MDBBtn>
                                                        </>
                                                    ) : (<></>)
                                                }
                                            </MDBCol>
                                            <MDBCol size='md' className='col-example'>
                                                {user && (
                                                    <>
                                                        Posted by: <a className="text-dark" href={'/user/' + user.id}>{user.username}</a>
                                                    </>)}
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBContainer>
                                </MDBCardFooter>
                                <MDBCardFooter>
                                    <MDBCardHeader className="h3">
                                        {localStorage.getItem("userId") && (
                                            <>
                                                <MDBBtn onClick={redirect} rounded color="info"><MDBIcon size="lg" fas icon="plus" /></MDBBtn>
                                            </>
                                        )} Opinions
                                    </MDBCardHeader>
                                    {
                                        opinions.length ? (
                                            opinions.map(opinion => (
                                                <OpinionCard key={opinion.id} data={opinion} />
                                            ))
                                        ) : (<>No opinion shared yet.</>)
                                    }


                                </MDBCardFooter>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol id='payment' md='4' style={{ marginBottom: '1%' }}>
                        <MDBCard style={paymentCardStyle}>
                            <MDBCardBody>
                                <MDBCardHeader className="h3"> Payment </MDBCardHeader>
                                <MDBCardText style={{ marginTop: '2%' }}>
                                    {currentValue} {campaign.currency} <small className='text-muted'>raised out of {targetValue} {campaign.currency}</small>
                                </MDBCardText>
                                <MDBCardText>
                                    <MDBProgress height='20'>
                                        <MDBProgressBar bgColor="info" width={percent} valuemin={0} valuemax={100}>
                                        </MDBProgressBar>
                                    </MDBProgress>
                                </MDBCardText>
                                <MDBCardFooter>
                                    <MDBCardTitle>
                                        {
                                            payments.length !== 0
                                                ? (
                                                    <>
                                                        <MDBIcon fas icon="chart-line" />  {payments.length} Contributions
                                                    </>
                                                )
                                                : (
                                                    <>
                                                        No Contributions 😢
                                                    </>
                                                )
                                        }
                                    </MDBCardTitle>
                                </MDBCardFooter>
                                <MDBCardFooter>
                                    <MDBBtn disabled={localStorage.getItem("userId") == campaignUserId} style={{ padding: '8%' }} onClick={redirect} color="success" rounded> Contribute <MDBIcon fas size="lg" icon="hand-holding-usd" /> </MDBBtn>
                                </MDBCardFooter>
                                <MDBCardFooter>
                                    <MDBCardTitle>Payment History</MDBCardTitle>
                                    <MDBCardText>

                                        {
                                            payments.length !== 0
                                                ? (
                                                    payments.map(payment => (
                                                        <PaymentCard key={payment.id} data={payment} />
                                                    ))
                                                )
                                                : (
                                                    <>
                                                        Nothing here...
                                                    </>
                                                )
                                        }
                                    </MDBCardText>
                                </MDBCardFooter>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    );
};
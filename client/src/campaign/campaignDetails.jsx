import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../App";
import "./details.css";
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


} from 'mdb-react-ui-kit';


export default function CampaignDetails() {

    let navigate = useNavigate();
    const [campaign, setCampaign] = useState([]);
    const { id } = useParams();
    const [opinions, setOpinions] = useState([]);
    const [targetValue, setTargetValue] = useState();
    const [currentValue, setCurrentValue] = useState();
    const [user, setUser] = useState();
    const [percent, setPercent] = useState(0);


    async function getUser() {
        await axios(BASE_API_URL + "campaigns/get-user-by-campaign/" + id)
            .then((response) => {
                setUser(response.data);
            });
    }


    function redirect() {
        navigate("add-opinion")
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
                calculateDifference(response.data.targetValue, response.data.currentValue);
            });
    };

    useEffect(() => {
        getCampaignData();
        getUser();
        calculateDifference(campaign.targetValue, campaign.currentValue);

    }, []);
    const paymentCardStyle = {
        width: '75%',
        textAlign: 'center',
        left: '12%',
        marginTop: '1%'
    }
    return (
        <>
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
                                                            <MDBBtn size="lg" rounded color='info' style={{ margin: '1%' }}>Update</MDBBtn>
                                                            <MDBBtn size="lg" rounded color='danger' style={{ margin: '1%' }}>Delete</MDBBtn>
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
                                                <OpinionCard data={opinion} />
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
                                    <MDBCardTitle><MDBIcon fas icon="chart-line" /> 10 Contributions</MDBCardTitle>
                                </MDBCardFooter>
                                <MDBCardFooter>
                                    <MDBBtn style={{ padding: '8%' }} color="success" rounded> Contribute <MDBIcon fas size="lg" icon="hand-holding-usd" /> </MDBBtn>
                                </MDBCardFooter>
                                <MDBCardFooter>
                                    <MDBCardTitle>Payment History</MDBCardTitle>
                                    <MDBCardText>
                                        <MDBCard style={{ margin: '3%' }}>
                                            <MDBCardHeader style={{ backgroundColor: 'rgba(0, 183, 74)', color: 'white' }}>2000-01-01</MDBCardHeader>
                                            <MDBCardBody>
                                                <MDBCardTitle><a className="text-dark" href={"/user/" + 10}>User</a></MDBCardTitle>
                                                <MDBCardText> Payed: number + {campaign.currency} </MDBCardText>
                                            </MDBCardBody>
                                        </MDBCard>
                                        <MDBCard style={{ margin: '3%' }}>
                                            <MDBCardHeader style={{ backgroundColor: 'rgba(0, 183, 74)', color: 'white' }}>2000-01-01</MDBCardHeader>
                                            <MDBCardBody>
                                                <MDBCardTitle><a className="text-dark" href={"/user/" + 10}>User</a></MDBCardTitle>
                                                <MDBCardText> Payed: number + {campaign.currency} </MDBCardText>
                                            </MDBCardBody>
                                        </MDBCard>
                                        <MDBCard style={{ margin: '3%' }}>
                                            <MDBCardHeader style={{ backgroundColor: 'rgba(0, 183, 74)', color: 'white' }}>2000-01-01</MDBCardHeader>
                                            <MDBCardBody>
                                                <MDBCardTitle><a className="text-dark" href={"/user/" + 10}>User</a></MDBCardTitle>
                                                <MDBCardText> Payed: number + {campaign.currency} </MDBCardText>
                                            </MDBCardBody>
                                        </MDBCard>
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
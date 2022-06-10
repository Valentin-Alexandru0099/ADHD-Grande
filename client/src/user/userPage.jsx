import axios from "axios";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBTypography,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter

} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BASE_API_URL } from "../App";
import defaultUser from "../image/default-user.jpg";
import CampaignCard from "../campaign/campaignCard";
import OpinionCard from "../opinion/opinionCard";
import './user-page.css';



export default function UserPage() {

    const { id } = useParams();
    const [user, setUser] = useState("");
    const [campaignsCount, setCampignsCount] = useState(0);
    const [opinionsCount, setOpinionsCount] = useState(0);
    const [phoneUrl, setPhoneUrl] = useState();
    const [campaignList, setCampaignList] = useState([]);
    const [opinionList, setOpinionList] = useState([]);


    async function getUser() {
        await axios(BASE_API_URL + "users/user/" + id)
            .then(response => {
                setUser(response.data);
                setCampignsCount(response.data.campaignList.length);
                setOpinionsCount(response.data.opinionList.length);
                setPhoneUrl("https://wa.me/" + response.data.phoneNumber)
                setCampaignList(response.data.campaignList)
                setOpinionList(response.data.opinionList)
            })
    };

    const [fillActive, setFillActive] = useState('campaign-tab');

    const handleFillClick = (value) => {
        if (value === fillActive) {
            return;
        }

        setFillActive(value);
    };


    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <MDBContainer style={{ marginTop: '1%', marginBottom: '1%' }}>
                <MDBCard alignment='center' style={{ margin: "1%" }}>
                    {id === localStorage.getItem("userId") && (
                        <>
                            <MDBCardHeader>
                                <MDBBtn size="lg" color="info" rounded>
                                    Edit Profile
                                </MDBBtn>
                            </MDBCardHeader>
                        </>
                    )}
                    <MDBCardBody>
                        <img
                            src={defaultUser}
                            className='img-fluid rounded-pill hover-shadow'
                            alt={defaultUser}
                            width='200rem'
                        />
                        <MDBCardText>
                            <MDBRow>
                                <h1>{user.username}</h1>
                            </MDBRow>
                        </MDBCardText>
                        <MDBCardText>
                            <MDBRow>
                                <MDBTypography className='lead mb-0'>
                                    {user.description}
                                </MDBTypography>
                            </MDBRow>
                        </MDBCardText>
                        <MDBCardText>
                            <MDBRow>
                                <MDBTypography tag='div' className='lead mb-0'>
                                    {user.email}
                                </MDBTypography>
                            </MDBRow>
                        </MDBCardText>
                        <MDBCardText>
                            <MDBRow>
                                <MDBTypography className='lead mb-0'>
                                    {user.phoneNumber}
                                </MDBTypography>
                            </MDBRow>
                        </MDBCardText>
                    </MDBCardBody>
                    <MDBCardFooter style={{ margin: '2%' }}>
                        <MDBContainer breakpoint='sm'>
                            <MDBRow>
                                <MDBCol size='md' className='col-example'>
                                    <p className="text-muted" style={{ marginTop: '5%' }}>Campaings</p>
                                    <MDBBtn size="lg" rounded color="info">
                                        {campaignsCount}
                                    </MDBBtn>
                                </MDBCol>
                                <MDBCol size='md' className='col-example'>
                                    <p className="text-muted" style={{ marginTop: '5%' }}>Opinions</p>
                                    <MDBBtn size="lg" rounded color="info">
                                        {opinionsCount}
                                    </MDBBtn>
                                </MDBCol>
                                <MDBCol size='md' className='col-example'>
                                    <p className="text-muted" style={{ marginTop: '5%' }}>Active since</p>
                                    <MDBBtn size="lg" rounded color="info">
                                        {user.submissionTime}
                                    </MDBBtn>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </MDBCardFooter>
                </MDBCard>

                <div style={{ margin: '3%', textAlign: 'center' }} >
                    <h3>
                        User Activity
                    </h3>
                </div>

                <MDBTabs fill className='mb-3'>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleFillClick('campaign-tab')} active={fillActive === 'campaign-tab'}>
                            Campaign List
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleFillClick('opinion-tab')} active={fillActive === 'opinion-tab'}>
                            Opinion List
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>
                <MDBTabsContent style={{ margin: '1%' }}>
                    <MDBTabsPane show={fillActive === 'campaign-tab'}>
                        {campaignList.length !== 0
                            ? (
                                <>
                                    {campaignList.map(campaign => (
                                        <CampaignCard key={campaign.id} data={campaign} />
                                    ))}
                                </>
                            )
                            : (
                                <>
                                    Nothing to show here...😭
                                </>
                            )}

                    </MDBTabsPane>
                    <MDBTabsPane show={fillActive === 'opinion-tab'}>
                        {opinionList.length !== 0
                            ? (
                                <>
                                    <MDBContainer className="opinion-container-tab">
                                        {opinionList.map(opinion => (
                                            <OpinionCard key={opinion.id} data={opinion} />
                                        ))}
                                    </MDBContainer>
                                </>
                            )
                            : (
                                <>
                                    Nothing to show here...😭
                                </>
                            )}

                    </MDBTabsPane>
                </MDBTabsContent>
            </MDBContainer >
        </>
    );
};
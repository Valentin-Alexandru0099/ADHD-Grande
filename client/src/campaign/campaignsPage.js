import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../App";
import CampaignCard from "./campaignCard";
import { useNavigate } from "react-router";
import {
    MDBBtn,
    MDBContainer,

} from 'mdb-react-ui-kit';


function Campaigns() {

    const [campaigns, setCampaigns] = useState([]);
    let navigate = useNavigate();

    async function getCampaignData() {
        await axios(BASE_API_URL + "campaigns")
            .then((response) => {
                setCampaigns(response.data);
            });
    }

    function redirect() {
        navigate("add-campaign");
        window.scroll(0, 0);
    }

    useEffect(() => {
        getCampaignData();
    }, [])

    return (
        <>
            <MDBContainer breakpoint="sm">
                {localStorage.getItem("userId") && (<MDBBtn style={{marginTop: '1%'}} rounded color='info' onClick={redirect}> Add Campaign </MDBBtn>)}
                {campaigns.map(campaign => (
                    <CampaignCard key={campaign.id} data={campaign} />
                ))}
            </MDBContainer>
        </>
    );
};

export default Campaigns;
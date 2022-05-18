import { Container } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../App";
import CampaignCard from "./campaignCard";


function Campaigns() {

    const [campaigns, setCampaigns] = useState([]);

    async function getCampaignData() {
        await axios(BASE_API_URL + "campaigns")
            .then((response) => {
                setCampaigns(response.data);
            });
    }

    useEffect(() => {
        getCampaignData();
    }, [])


    return (
        <Container>
            {campaigns.map(campaign => (
                <CampaignCard key={campaign.id} data={campaign} />
            ))}
        </Container>
    );
};

export default Campaigns;
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../App";
import CampaignCard from "./campaignCard";
import { useNavigate } from "react-router";


function Campaigns() {

    const [campaigns, setCampaigns] = useState([]);
    let navigate = useNavigate();

    async function getCampaignData() {
        await axios(BASE_API_URL + "campaigns")
            .then((response) => {
                setCampaigns(response.data);
            });
    }

    function redirect(){
        navigate("add-campaign");
        window.scroll(0,0);
    }

    useEffect(() => {
        getCampaignData();
    }, [])

    return (
        <Container>
            <Button variant="dark" onClick={redirect} className="add-campaign">+ Add Campaign +</Button>
            {campaigns.map(campaign => (
                <CampaignCard key={campaign.id} data={campaign} />
            ))}
        </Container>
    );
};

export default Campaigns;
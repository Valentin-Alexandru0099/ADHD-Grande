import { Container, Card, ProgressBar,Button } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../App";
import CampaignCard from "./campaignCard";
import card_image from "../images/card_image.png";
import { useNavigate } from "react-router";


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


    let navigate = useNavigate();

    function redirectTo(){
        navigate("/campaign/"+1)
        window.scroll(0,0);
    }

    return (
        <Container>
            <div className="campaigns_workspace">
                <img className="card_image" width="31%" height="10%" src={card_image}></img>
                <Card>
                    <Card.Header>
                        Help Alex treat his Obsession with this name...
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            <p>This Campaign Target:</p>
                            <ProgressBar animated variant="success" now={50} />
                            <strong>1,000,000 €</strong>
                            <Button variant="dark" className="redirect-button" onClick={redirectTo}>
                               Campaign &gt;&gt;
                            </Button>
                        </Card.Title>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <footer>
                            Created by: <a href="/user/1" title="Source Title">ADHD</a>
                        </footer>
                    </Card.Footer>
                </Card>
            </div>
            {campaigns.map(campaign => (
                <CampaignCard key={campaign.id} data={campaign} />
            ))}

        </Container>
    );
};

export default Campaigns;
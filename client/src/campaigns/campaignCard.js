import { Card, ProgressBar, Button } from "react-bootstrap";
import "./campaigns.css";
import card_image from "../images/card_image.png";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../App";


export default function CampaignCard(props) {

    let navigate = useNavigate();

    function redirectTo() {
        navigate("campaign/" + props.data.id)
        window.scroll(0, 0);
    }


    function showStatus(statusDiv) {
        statusDiv.style = "display: block;";
        setTimeout(() => {
            statusDiv.style = "display: none;";
        }, 2000);
    }

    async function deleteCampaign(campaignId) {
        showStatus(document.getElementById(campaignId));
        await axios.delete(BASE_API_URL + "campaigns/delete-campaign/"+ campaignId)
            .then(showStatus())
    }

    const [percent, setPercent] = useState(0);

    useEffect(() => {
        calculateDifference(props.data.targetValue, props.data.currentValue);
    }, [])

    function calculateDifference(num1, num2) {
        setPercent((num2 / num1) * 100);
    }

    return (
        <>
            <div className="delete-status" id={props.data.id}>
                Delete Successful!
            </div>
            <div className="campaigns_workspace">
                <img className="card_image" width="35%" src={card_image}></img>
                <Card className="campaign-card">
                    <Card.Header>
                        {props.data.name}
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            <p>This Campaign Target:</p>
                            <strong>{props.data.targetValue}&nbsp;{props.data.currency}</strong><br />
                            <ProgressBar animated variant="success" now={percent} /><br />
                            <Button variant="dark" className="redirect-button" onClick={redirectTo}>
                                Campaign &gt;&gt;
                            </Button>
                            <Button variant="danger" className="delete-button" onClick={() => { deleteCampaign(props.data.id) }}>
                                Delete
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
        </>
    )
}

import { Card, ProgressBar, Button } from "react-bootstrap";
import "./campaigns.css";
import card_image from "../images/card_image.png";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";


export default function CampaignCard(props) {

    let navigate = useNavigate();

    function redirectTo() {
        navigate("campaign/"+props.data.id)
        window.scroll(0, 0);
    }

    const [percent, setPercent] = useState(0);

    useEffect(() => {
        calculateDifference(props.data.targetValue, props.data.currentValue);
    }, [])

    function calculateDifference(num1, num2) {
        setPercent((num2 / num1) * 100);
    }

    return (
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
    )
}

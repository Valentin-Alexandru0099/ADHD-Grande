import { Card, ProgressBar, Button } from "react-bootstrap";
import "./campaigns.css";
import card_image from "../image/card_image.png";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../App";


export default function CampaignCard(props) {

    let navigate = useNavigate();

    function redirectTo() {
        navigate("campaign/" + props.data.id)
        window.scroll(0, 0);
    };

    const [user, setUser] = useState();

    async function getUser() {
        await axios(BASE_API_URL + "campaigns/getUser/" + props.data.id)
            .then((response) => {
                setUser(response.data);
            });
    }


    const [percent, setPercent] = useState(0);

    useEffect(() => {
        calculateDifference(props.data.targetValue, props.data.currentValue);
        getUser();

    }, []);


    function calculateDifference(num1, num2) {
        setPercent((num2 / num1) * 100);
    };

    return (
        <>
            <div className="campaigns_workspace" data-campaign-id={props.data.id}>
                <img className="card_image" width="35%" src={card_image}></img>
                <Card className="campaign-card">
                    <Card.Header>
                        {props.data.name}
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            <p>This Campaign Target:</p>
                            <strong>{props.data.targetValue}&nbsp;{props.data.currency}</strong><br />
                            <ProgressBar variant="success" now={percent} /><br />
                            <Button variant="dark" className="redirect-button" onClick={redirectTo}>
                                Campaign &gt;&gt;
                            </Button>
                        </Card.Title>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <footer>
                            {user && (<>
                                Created by: <a href={"user/" + user.id} title="Source Title">{user.username}</a></>
                                )}
                        </footer>

                    </Card.Footer>
                </Card>
            </div>
        </>
    );
};

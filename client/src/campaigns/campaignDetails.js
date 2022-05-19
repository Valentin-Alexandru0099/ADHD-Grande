import { Container, Button, Card } from "react-bootstrap";
import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../App";
import "./details.css";
import Form from 'react-bootstrap/Form'
import photo from "../images/card_image.png";
import OpinionCard from "../opinion/opinionCard";

export default function CampaignDetails() {

    const possibleAmount = ["1", "5", "10", "50", "100", "200", "500", "1000"];
    const [campaign, setCampaign] = useState([]);
    const { id } = useParams();
    const [opinions, setOpinions] = useState([]);

    async function getCampaignData() {
        await axios(BASE_API_URL + "campaigns/campaign/" + id)
            .then((response) => {
                setCampaign(response.data);
                setOpinions(response.data.opinionList);
            });
    }

    useEffect(() => {
        getCampaignData();
    }, [])

    return (
        <>
            <Container >
                <div className="detail-workspace">
                    <div className="camapign-details">
                        <h2>{campaign.name}</h2>
                        <img className="photo" src={photo} width="90%"></img>
                        <br />
                        <h3>
                            {campaign.currentValue}  / {campaign.targetValue} {campaign.currency}
                        </h3>
                        <br />
                        <h2>
                            About this Campaign:
                        </h2>
                        <div className="description">
                            {campaign.description}
                        </div>
                    </div>
                    <div className="campaign-payment">
                        <h1>Payment</h1>
                        <Form>
                            <div className="mb-3">
                                {possibleAmount.map((amaount, index) => {
                                    return (
                                        <Form.Check
                                            key={index}
                                            label={amaount}
                                            name="payment-value"
                                            value={amaount}
                                            type="radio"
                                            id={`inline-radio-${index + 1}`}
                                        />);
                                })}
                            </div>
                        </Form>
                        <Button variant="dark">Payment</Button>
                        <h4>
                            Payment History:
                        </h4>
                        <div className="payment-history">
                            <Card className="history">
                                <Card.Body>
                                    <blockquote className="blockquote mb-0">
                                        <h5>
                                            Cineva payed: atat +
                                        </h5>
                                    </blockquote>
                                    <small>12-2-2022</small>
                                </Card.Body>
                            </Card>
                            <Card className="history">
                                <Card.Body>
                                    <blockquote className="blockquote mb-0">
                                        <h5>
                                            Cineva payed: atat +
                                        </h5>
                                    </blockquote>
                                    <small>12-2-2022</small>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="opinion-workspace">
                    <h2 className="opinion-title">
                        Opinions:
                    </h2>
                    {opinions.map((opinion, index) => {
                        return(
                        <OpinionCard data={opinion} key={index} />)
                    })}
                </div>
            </Container>
        </>
    );
}
import { Container, Button, Card } from "react-bootstrap";
import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../App";
import "./details.css";
import Form from 'react-bootstrap/Form'

export default function CampaignDetails() {

    const possibleAmount = ["1", "5", "10", "50", "100", "200", "500", "1000"];
    const [campaign, setCampaign] = useState([]);
    const { id } = useParams();

    async function getCampaignData() {
        await axios(BASE_API_URL + "campaigns/campaign/" + id)
            .then((response) => {
                setCampaign(response.data);
            });
    }

    useEffect(() => {
        getCampaignData();
    }, [])
    const type = "radio";

    return (
        <Container>
            <div className="camapign-details">
                ceva
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
                                    type={type}
                                    id={`inline-${type}-${index + 1}`}
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
                    </Card><Card className="history">
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <h5>
                                    Cineva payed: atat +
                                </h5>
                            </blockquote>
                            <small>12-2-2022</small>

                        </Card.Body>
                    </Card><Card className="history">
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <h5>
                                    Cineva payed: atat +
                                </h5>
                            </blockquote>
                            <small>12-2-2022</small>

                        </Card.Body>
                    </Card><Card className="history">
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
        </Container>
    );
}
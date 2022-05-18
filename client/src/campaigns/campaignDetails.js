import { Container, Button, Card, ProgressBar } from "react-bootstrap";
import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../App";
import "./details.css";
import Form from 'react-bootstrap/Form'
import photo from "../images/card_image.png";

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

    return (
        <>
            <Container >
                <div className="detail-workspace">
                    <div className="camapign-details">
                        <h2>Title</h2>
                        <img className="photo" src={photo} width="90%"></img>
                        <br />
                        <strong>
                            Target: 1,000,000 euro
                        </strong>
                        <div className="bar">
                            <ProgressBar animated variant="success" now={50} />
                        </div>
                        <br />
                        <strong>
                            Current Value: ...
                        </strong>
                        <br />
                        <h2>
                            About this Campaign:
                        </h2>
                        <div className="description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Condimentum id venenatis a condimentum vitae sapien. Diam phasellus vestibulum lorem sed risus ultricies.
                            Mi eget mauris pharetra et. Iaculis eu non diam phasellus vestibulum lorem sed risus ultricies.
                            Quam quisque id diam vel quam elementum pulvinar etiam. Arcu bibendum at varius vel pharetra vel.
                            Aliquet risus feugiat in ante metus. Eu non diam phasellus vestibulum.
                            Neque ornare aenean euismod elementum nisi quis eleifend quam.
                            Lectus proin nibh nisl condimentum id. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien.
                            Pellentesque sit amet porttitor eget. Quis viverra nibh cras pulvinar mattis nunc sed blandit libero.
                            Justo eget magna fermentum iaculis eu non. Volutpat ac tincidunt vitae semper quis lectus.
                            Ultricies lacus sed turpis tincidunt id aliquet risus. Augue mauris augue neque gravida in.
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
                    <Card className="opinion-card">
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                                    erat a ante.
                                </p>
                                <footer className="blockquote-footer">
                                    Someone famous in <cite title="Source Title">Source Title</cite>
                                </footer>
                            </blockquote>
                        </Card.Body>
                    </Card>
                    <Card className="opinion-card">
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                                    erat a ante.
                                </p>
                                <footer className="blockquote-footer">
                                    Someone famous in <cite title="Source Title">Source Title</cite>
                                </footer>
                            </blockquote>
                        </Card.Body>
                    </Card>
                    <Card className="opinion-card">
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                                    erat a ante.
                                </p>
                                <footer className="blockquote-footer">
                                    Someone famous in <cite title="Source Title">Source Title</cite>
                                </footer>
                            </blockquote>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    );
}
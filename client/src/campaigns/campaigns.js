import { Card, Container } from "react-bootstrap";
import "./campaigns.css";
import card_image from "../images/card_image.png";

function Campaigns(){
    return(
        <Container>
            <div className="campaigns_workspace">
                <img className="card_image" width="30%" height="10%" src={card_image}></img>
                <Card>
                    <Card.Header>
                        Help Alex treat his Obsession with this name...
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            0 / <small>1,000,000</small> €
                        </Card.Title>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <footer>
                            Created by: <cite title="Source Title">ADHD</cite>
                        </footer>
                    </Card.Footer>                  
                </Card>
            </div>
            <div className="campaigns_workspace">
                <img className="card_image" width="30%" height="10%" src={card_image}></img>
                <Card>
                    <Card.Header>
                        Title
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            AcualValue/<small>Target</small> + Currency
                        </Card.Title>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <footer>
                            Created by: <cite title="Source Title">ADHD</cite>
                        </footer>
                    </Card.Footer>                  
                </Card>
            </div>
            <div className="campaigns_workspace">
                <img className="card_image" width="30%" height="10%" src={card_image}></img>
                <Card>
                    <Card.Header>
                        Title
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            AcualValue/<small>Target</small> + Currency
                        </Card.Title>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <footer>
                            Created by: <cite title="Source Title">ADHD</cite>
                        </footer>
                    </Card.Footer>                  
                </Card>
            </div>
            <div className="campaigns_workspace">
                <img className="card_image" width="30%" height="10%" src={card_image}></img>
                <Card>
                    <Card.Header>
                        Title
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            AcualValue/<small>Target</small> + Currency
                        </Card.Title>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <footer>
                            Created by: <cite title="Source Title">ADHD</cite>
                        </footer>
                    </Card.Footer>                  
                </Card>
            </div>
            <div className="campaigns_workspace">
                <img className="card_image" width="30%" height="10%" src={card_image}></img>
                <Card>
                    <Card.Header>
                        Title
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            AcualValue/<small>Target</small> + Currency
                        </Card.Title>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <footer>
                            Created by: <cite title="Source Title">ADHD</cite>
                        </footer>
                    </Card.Footer>                  
                </Card>
            </div>
        </Container>
    );
};

export default Campaigns;
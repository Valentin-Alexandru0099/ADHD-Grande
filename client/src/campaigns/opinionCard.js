import { Card } from "react-bootstrap";



export default function OpinionCard(props){

    return(
        <Card className="opinion-card">
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <p>
                                    {props.data.description }
                                </p>
                                <footer className="blockquote-footer">
                                    Posted by:  <cite title="Source Title">ADHD</cite>
                                </footer>
                            </blockquote>
                        </Card.Body>
                    </Card>
    );
};
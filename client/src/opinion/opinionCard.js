import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { BASE_API_URL } from "../App";



export default function OpinionCard(props) {

    async function deleteOpinion(opinionId) {
        await axios.delete(BASE_API_URL + "opinions/delete-opinion/" + opinionId, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        })
            .then(showStatus(opinionId));
    };


    function showStatus(opinionId) {
        document.querySelector(`.opinion-card[data-opinion-id="${opinionId}"]`).remove();
        let statusDiv = document.getElementById(opinionId);
        statusDiv.style = "display: block;";
        setTimeout(() => {
            statusDiv.remove();
        }, 5000);
    };

    return (
        <>
            <div className="delete-status" id={props.data.id}>
                Delete Successful!
            </div>
            <Card className="opinion-card" data-opinion-id={props.data.id}>
                <Card.Header className="opinion-card-head">
                    <Button onClick={() => { deleteOpinion(props.data.id) }} variant="light"> X </Button>
                </Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>
                            {props.data.description}
                        </p>
                        <footer className="blockquote-footer">
                            Posted by:  <cite title="Source Title">ADHD</cite>
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>
        </>
    );
};
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { BASE_API_URL } from "../App";
import { BsHammer } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";


export default function OpinionCard(props) {

    let navigate = useNavigate();

    const { id } = useParams();
    async function deleteOpinion() {
        await axios.delete(BASE_API_URL + "opinions/delete-opinion/" + props.data.id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                console.log(response);
            })
            .finally(window.location.reload())
    };

    const [user, setUser] = useState();

    async function getUser() {
        await axios(BASE_API_URL + "opinions/get-user-by-opinion/" + props.data.id)
            .then((response) => {
                setUser(response.data);
            });
    }

    useEffect(() => (
        getUser
    ), []);

    function updateOpinion() {
        navigate("/campaigns/campaign/" + id + "/update-opinion/" + props.data.id)
    }


    return (
        <>
            <Card className="opinion-card" data-opinion-id={props.data.id}>
                <Card.Header className="opinion-card-head">
                    {user ? user.id == localStorage.getItem("userId") && (
                        <div className="user-action">
                            <Button className="delete-opinion-button" onClick={deleteOpinion} variant="danger"> X </Button>
                            <Button className="update-opinion-button" onClick={updateOpinion} variant="info"><BsHammer /></Button>
                        </div>
                    ) : (<></>)}
                    {user && (<div className="opinion-title"><a href={"/user/" + user.id}>{user.username}</a> feels ...</div>)}
                </Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>
                            {props.data.description}
                        </p>
                    </blockquote>
                </Card.Body>
            </Card>
        </>
    );
};
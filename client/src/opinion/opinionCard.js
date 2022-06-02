import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { BASE_API_URL } from "../App";



export default function OpinionCard(props) {

    // async function deleteOpinion(opinionId) {
    //     await axios.delete(BASE_API_URL + "opinions/delete-opinion/" + opinionId, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': "Bearer " + localStorage.getItem("token")
    //         }
    //     })
    //         .then(response => {
    //             console.log(response);
    //         })
    // };

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


    return (
        <>
            <Card className="opinion-card" data-opinion-id={props.data.id}>
                <Card.Header className="opinion-card-head">
                    <Button variant="light"> X </Button>
                    {user && (<><a href={"/user/"+ user.id}>{user.username}</a> feels ...</>)}
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
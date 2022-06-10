import axios from 'axios';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardHeader,

} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { BASE_API_URL } from '../App';

export default function PaymentCard(props) {

    const [username, setUsername] = useState();
    const [userId, setUserId] = useState();


    async function getUser() {
        axios(BASE_API_URL + "payment/get-user-by-payment/" + props.data.id)
            .then(response => {
                setUsername(response.data.username);
                setUserId(response.data.id);
            });
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <MDBCard style={{ margin: '3%' }}>
                <MDBCardHeader style={{ backgroundColor: 'rgba(0, 183, 74)', color: 'white' }}>{props.data.submissionTime}</MDBCardHeader>
                <MDBCardBody>
                    <MDBCardTitle><a className="text-dark" href={"/user/" + userId }>{username}</a></MDBCardTitle>
                    <MDBCardText>Donated {props.data.value} {props.data.currency}</MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </>
    );
};
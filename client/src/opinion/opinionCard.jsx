import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../App";
import { useNavigate, useParams } from "react-router";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardHeader,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBDropdownLink,
    MDBIcon,
    MDBRow,
    MDBCol,

} from 'mdb-react-ui-kit';

export default function OpinionCard(props) {

    let navigate = useNavigate();

    const [user, setUser] = useState();
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

    const opinionHeaderStyle = {
        backgroundColor: '#39c0ed',
        color: "white",
    }
    return (
        <>
            <MDBCard>
                <MDBCardBody>
                    <MDBCardHeader style={opinionHeaderStyle}>
                        <MDBRow>
                            <MDBCol md='1' className='col-example'>
                                {
                                    user && localStorage.getItem("userId") == user.id &&
                                    (
                                        <>
                                            <MDBDropdown dropright>
                                                <MDBDropdownToggle className='btn btn-light'>
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu>
                                                    <MDBDropdownItem>
                                                        <MDBDropdownLink onClick={updateOpinion}>Update</MDBDropdownLink>
                                                    </MDBDropdownItem>
                                                    <MDBDropdownItem>
                                                        <MDBDropdownLink onClick={deleteOpinion}>Delete</MDBDropdownLink>
                                                    </MDBDropdownItem>
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
                                        </>
                                    )
                                }
                            </MDBCol>
                            <MDBCol md='10' className='col-example'>
                                2000-01-01{props.data.submissionTime}
                            </MDBCol>
                        </MDBRow>

                    </MDBCardHeader>
                    <MDBCardText style={{ marginTop: '1%' }}>
                        {user && (
                            <>
                                <a className="text-dark" href={"/user/" + user.id}>{user.username}</a> feels ... :
                            </>
                        )}
                    </MDBCardText>
                    <MDBCardText >
                        {props.data.description}
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </>
    );
};
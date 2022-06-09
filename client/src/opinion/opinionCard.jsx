import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../App";
import { useNavigate, useParams } from "react-router";
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardHeader,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBDropdownLink,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,

} from 'mdb-react-ui-kit';

export default function OpinionCard(props) {

    let navigate = useNavigate();

    const [user, setUser] = useState();
    const { id } = useParams();
    const [emoji, setEmoji] = useState();
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);


    async function handleDelete() {
        toggleShow();
        await axios.delete(BASE_API_URL + "opinions/delete-opinion/" + props.data.id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        })
            .finally(
                window.location.reload()
            );
    };

    function addEmoji() {
        switch (props.data.feeling) {
            case "HAPPY":
                setEmoji('😄');
                break;
            case "SAD":
                setEmoji('🙁');
                break;
            case "ANGRY":
                setEmoji('😡');
                break;
            case "EXCITED":
                setEmoji('🤩');
                break;
            case "CONFUSED":
                setEmoji('🤨');
                break;
            case "WONDERING":
                setEmoji('🤔');
                break;
        };
    };

    async function getUser() {
        await axios(BASE_API_URL + "opinions/get-user-by-opinion/" + props.data.id)
            .then((response) => {
                setUser(response.data);
            });
    }

    useEffect(() => {
        getUser();
        addEmoji();
    }, []);

    function updateOpinion() {
        navigate("update-opinion/" + props.data.id)
    }

    const opinionHeaderStyle = {
        backgroundColor: '#39c0ed',
        color: "white",
    }

    console.log(props.data)
    return (
        <>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog centered >
                    <MDBModalContent>
                        <MDBModalHeader style={{ backgroundColor: 'rgb(57, 192, 237)', color: 'white' }}>
                            <MDBModalTitle >Hold up!</MDBModalTitle>
                            <MDBBtn className='btn-close' color='white' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>You are about to delete an opinion!</MDBModalBody>
                        <MDBModalBody>Are you sure?</MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='success' onClick={toggleShow}>
                                No
                            </MDBBtn>
                            <MDBBtn color="danger" onClick={handleDelete} > Yes </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
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
                                                        <MDBDropdownLink onClick={toggleShow}>Delete</MDBDropdownLink>
                                                    </MDBDropdownItem>
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
                                        </>
                                    )
                                }
                            </MDBCol>
                            <MDBCol md='10' className='col-example'>
                                {props.data.submissionTime}
                            </MDBCol>
                        </MDBRow>

                    </MDBCardHeader>
                    <MDBCardText style={{ marginTop: '1%' }}>
                        {user && (
                            <>
                                <a className="text-dark" href={"/user/" + user.id}>{user.username}</a> feels {props.data.feeling} {emoji} :
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
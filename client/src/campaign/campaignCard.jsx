import card_image from "../image/card_image.jpg";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../App";
import {
  MDBBtn,
  MDBCard,
  MDBRow,
  MDBCol,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBCardHeader,
  MDBProgress,
  MDBProgressBar,


} from 'mdb-react-ui-kit';


export default function CampaignCard(props) {

  let navigate = useNavigate();

  function redirectTo() {
    navigate("campaign/" + props.data.id)
    window.scroll(0, 0);
  };

  const [user, setUser] = useState();
  const [targetValue, setTargetValue] = useState();

  async function getUser() {
    await axios(BASE_API_URL + "campaigns/get-user-by-campaign/" + props.data.id)
      .then((response) => {
        setUser(response.data);
      });
  }

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    calculateDifference(props.data.targetValue, props.data.currentValue);
    setTargetValue(props.data.targetValue.toLocaleString('en-US'));
    getUser();

  }, []);

  function calculateDifference(num1, num2) {
    setPercent((num2 / num1) * 100);
  };

  const cardFooterStyle = {
    backgroundColor: '#1B5E20',
    color: 'white',
    textAlign: 'right'
  }

  return (
    <>
      <div className='container p-4'>
        <MDBCard>
          <MDBCardHeader style={{ backgroundColor: 'green', color: 'white' }}>Posted at: {props.data.submissionTime}</MDBCardHeader>
          <MDBRow className='g-0'>
            <MDBCol md='4'>
              <MDBCardImage style={{ height: '200px' }} src={card_image} alt='...' fluid />
            </MDBCol>
            <MDBCol md='8'>
              <MDBCardBody>
                <MDBCardTitle>{props.data.name}</MDBCardTitle>
                <MDBCardText>
                  Target: {targetValue} {props.data.currency}
                </MDBCardText>
                <MDBCardText>
                  <MDBProgress height='20'>
                    <MDBProgressBar bgColor="info" width={percent} valuemin={0} valuemax={100}>
                    </MDBProgressBar>
                  </MDBProgress>
                </MDBCardText>
                <MDBCardText>
                  <MDBBtn onClick={redirectTo} color="info"> Details   &gt;&gt;</MDBBtn>
                </MDBCardText>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
          <MDBCardFooter style={cardFooterStyle}>{user && (
            <>
              Posted by: <a className="text-white" href={"/user/" + user.id}>{user.username}</a>
            </>
          )}</MDBCardFooter>
        </MDBCard>
      </div>
    </>
  );
};

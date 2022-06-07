import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_API_URL } from '../App';
import homeImg from '../image/home_wallpaper.jpg';
import infoImg1 from '../image/info1.jpg';
import infoImg2 from '../image/info2.jpg';
import {
  MDBCard,
  MDBBtn,
  MDBCardOverlay,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,

} from 'mdb-react-ui-kit';



function Home() {

  let navigate = useNavigate();

  const [campaignsCount, setCampaignsCount] = useState(0);
  const [accountsCount, setAccountsCount] = useState(0);

  function redirectTo(routeName) {
    if (routeName === "campaigns/add-campaign" && !localStorage.getItem("userId")) {
      navigate("/login");
      window.scroll(0, 0);
      return;
    }
    navigate(routeName);
    window.scroll(0, 0);
  }

  async function getCampaignCount() {
    await axios(BASE_API_URL + "campaigns/count")
      .then((response) => {
        setCampaignsCount(response.data);
      });
  };

  async function getAccountCount() {
    await axios(BASE_API_URL + "users/count")
      .then((response) => {
        setAccountsCount(response.data);
      });
  };

  useEffect(() => {
    getAccountCount();
    getCampaignCount();
  }, [])

  const infoButtonStyle = {
    left: 0,
    top: '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const searchInputStyle = {
    padding: "1%",
    marginRight: "1%",
    backgroundColor: 'whitesmoke'
  }

  const infoContainerStyle = {
    display: 'flex',
    justifyContent: 'space-evenly',
    textAlign: 'center'
  }

  const infoButtonsStyle = {
    fontSize: '1.25rem'

  }

  const searchTitleStyle = {
    textAlign: 'center'
  }

  const infoTextStyle = {
    margin: '5%'
  }

  return (
    <>
      <MDBCard background='dark' className='text-white'>
        <MDBCardImage overlay src={homeImg} alt='...' />
        <MDBCardOverlay style={infoButtonStyle}>
          <MDBBtn rounded color='info' data-aos="fade-down" href='/about_us'> Learn More </MDBBtn>
        </MDBCardOverlay>
      </MDBCard>

      <div className='container p-5' style={searchTitleStyle}>
        <h3>Search amoung the {campaignsCount} campaigns available !</h3>
        <form className='d-flex w-auto'>
          <input style={searchInputStyle} type='search' className='form-control' placeholder='Search campaign...' aria-label='Search' />
          <MDBBtn rounded color='info'>Search</MDBBtn>
        </form>
      </div>

      <div className='container p-5' style={searchTitleStyle}>
        <h1>What's ADHD GRANDE ?</h1>
        <p> ADHD GRANDE, it's Alex's first React project where he's learning a LOT of new frameworks and tricks. 😁</p>
      </div>

      <div className='container p-5' style={searchTitleStyle}>
        <h1>Why ADHD GRANDE ?</h1>
        <p> It's an easy and fun platform to work with.</p>
        <p> Enjoy your stay !</p>
        <p>💚</p>
      </div>

      <div className='container p-5' data-aos="fade-down">
        <MDBCard style={searchTitleStyle}>
          <MDBRow className='g-0'>
            <MDBCol md='4'>
              <MDBCardImage src={infoImg1} alt='...' fluid />
            </MDBCol>
            <MDBCol md='8'>
              <MDBCardBody>
                <MDBCardTitle> Do you have an idea who needs support ? </MDBCardTitle>
                <MDBCardText style={infoTextStyle}>
                  With one onclick on the button below you can open a campaign and describe your idea to people
                  who are willing to invest in <span style={infoButtonsStyle} className='text-uppercase'>you !</span>
                </MDBCardText>
                <MDBCardText>
                  <MDBBtn onClick={()=>{redirectTo("campaigns/add-campaign")}} rounded color='info' style={infoButtonsStyle}>Add Campaign</MDBBtn>
                </MDBCardText>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </div>

      <div className='container p-5' style={searchTitleStyle}>
        <MDBBtn style={infoButtonsStyle} size='lg' rounded color='success' href='#alternative' > OR </MDBBtn>
      </div>

      <div className='container p-5' id='alternative' data-aos="fade-up">
        <MDBCard style={searchTitleStyle}>
          <MDBRow className='g-0'>
            <MDBCol md='8'>
              <MDBCardBody>
                <MDBCardTitle> Would you like to donate to one of our campaigns ?</MDBCardTitle>
                <MDBCardText style={infoTextStyle}>
                  Here you can see and access each and every campaign detail page
                  and donate to those in need.
                  <p>Be the <span style={infoButtonsStyle} className="text-uppercase" >supporter</span> someone is looking for !</p>
                </MDBCardText>
                <MDBCardText>
                  <MDBBtn onClick={()=>{redirectTo("campaigns")}} rounded color='info' style={infoButtonsStyle}>Campaigns List</MDBBtn>
                </MDBCardText>
              </MDBCardBody>
            </MDBCol>
            <MDBCol md='4'>
              <MDBCardImage src={infoImg2} alt='...' fluid />
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </div>

      <div className='container p-5'>
        <div data-aos="flip-down" data-aos-duration="2000">
          <MDBRow style={infoContainerStyle} id='count-info'>
            <div className='col-lg-2 col-md-12 mb-4 mb-md-0'>
              <MDBBtn rounded style={{ padding: '12%' }} color='success'>
                <p className="text-uppercase"> Total Campaigns: </p>
                <p style={infoButtonsStyle}>{campaignsCount}</p>
              </MDBBtn>
            </div>
            <div className='col-lg-2 col-md-12 mb-4 mb-md-0'>
              <MDBBtn rounded style={{ padding: '12%' }} color='success'>
                <p className="text-uppercase"> Total Accounts: </p>
                <p style={infoButtonsStyle}>{accountsCount}</p>
              </MDBBtn>
            </div>
          </MDBRow>
        </div>
      </div>
    </>
  );
};

export default Home;

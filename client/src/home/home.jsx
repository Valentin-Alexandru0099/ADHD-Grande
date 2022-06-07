import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_API_URL } from '../App';
import homeImg from '../image/home_wallpaper.jpg';
import { MDBCard, MDBBtn, MDBCardOverlay, MDBCardImage, MDBRow } from 'mdb-react-ui-kit';
import './home.css';



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

  return (
    <>
      <MDBCard background='dark' className='text-white'>
        <MDBCardImage overlay src={homeImg} alt='...' />
        <MDBCardOverlay style={infoButtonStyle}>
          <MDBBtn rounded color='info' data-aos="fade-down" href='/about_us'> Learn More </MDBBtn>
        </MDBCardOverlay>
      </MDBCard>
      <div className='container p-4'>

        <MDBRow id='count-info'>
          <div className='col-lg-2 col-md-12 mb-4 mb-md-0'>
            <p className="text-uppercase"> Total Campaigns: </p><MDBBtn id='info-numbers' size='lg' rounded color='info' >{campaignsCount}</MDBBtn>
          </div>
          <div className='col-lg-2 col-md-12 mb-4 mb-md-0'>
            <p className="text-uppercase"> Total Accounts: </p><MDBBtn id='info-numbers' size='lg' rounded color='info' >{accountsCount}</MDBBtn>
          </div>
        </MDBRow>
      </div>

    </>
    // <Container>
    //   <div className="index_page">
    //     <h1 data-aos="fade-in" data-aos-duration="1200" className="title">&nbsp;ADHD GRANDE Crowdfunding&nbsp;</h1>
    //   </div>
    //   <div data-aos="fade-left" data-aos-duration="1200" className='descriptive_div'>
    //     <div className='workspace_descriptive' onClick={() => redirectTo("/about_us")} >
    //       The Best Platform For Crowdfunding Of Any Kind.
    //     </div>
    //   </div>
    //   <div className='influence_campaign_workspace'>
    //     <div data-aos="fade-up-right" data-aos-duration="1200" className="influence_campaign">
    //       <p>Intereseted in opening a campaign?</p>
    //       <p className='hide'>Open one NOW:</p>
    //       <Button className='btn-redirect' variant='dark' onClick={() => redirectTo("campaigns/add-campaign")}>
    //         <strong>New Campaign</strong>
    //       </Button>
    //     </div>
    //   </div>
    //   <div className='influence_doante_workspace'>
    //     <div data-aos="fade-up-left" data-aos-duration="1200" className="influence_donate">
    //       <p>Or do <strong>YOU</strong> want to <strong>DONATE</strong> to a <strong>CAMPAIGN</strong> ?</p>
    //       <p className='hide'>Do <strong>IT</strong> right <strong>NOW</strong>:</p>
    //       <Button className='btn-redirect' variant='dark' onClick={() => redirectTo("/campaigns")}>
    //         <strong>Campaigns</strong>
    //       </Button>
    //     </div>
    //   </div>
    //   <div className='info-workspace' data-aos="flip-up" data-aos-duration="1200">
    //     <div className="information">
    //       <p>
    //         Total Accounts on site:
    //       </p>
    //       <p className='info-num'>
    //         {accountsCount}
    //       </p>
    //     </div>
    //     <div data-aos="flip-up" data-aos-duration="2000" className="information">
    //       <p>
    //         Total Campaigns on site:
    //       </p>
    //       <p className='info-num'>
    //         {campaignsCount}
    //       </p>
    //     </div>
    //   </div>
    // </Container>
  );
};

export default Home;

import './home.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_API_URL } from '../App';


function Home() {

  AOS.init();
  let navigate = useNavigate();

  const [campaignsCount, setCampaignsCount] = useState(0);
  const [accountsCount, setAccountsCount] = useState(0);


  function redirectTo(routeName) {
    navigate(routeName);
    window.scroll(0, 0);
  }

  async function getCampaignCount() {
    await axios(BASE_API_URL+"campaigns/count")
      .then((response) => {
        setCampaignsCount(response.data);
      });
  };

  async function getAccountCount() {
    await axios(BASE_API_URL+"users/count")
      .then((response) => {
        setAccountsCount(response.data);
      });
  };


  useEffect(()=>{
    getAccountCount();
    getCampaignCount();
  },[])

  return (
    <Container>
      <div className="index_page">
        <h1 data-aos="fade-in" data-aos-duration="1200" className="title">&nbsp;ADHD GRANDE Crowdfunding&nbsp;</h1>
      </div>
      <div data-aos="fade-left" data-aos-duration="1200" className='descriptive_div'>
        <div className='workspace_descriptive' onClick={() => redirectTo("/about_us")} >
          The Best Platform For Crowdfunding Of Any Kind.
        </div>
      </div>
      <div className='influence_campaign_workspace'>
        <div data-aos="fade-up-right" data-aos-duration="1200" className="influence_campaign">
          <p>Intereseted in opening a campaign?</p>
          <p className='hide'>Open one NOW:</p>
          <Button className='btn-redirect' variant='dark' onClick={() => redirectTo("campaigns/add-campaign")}>
            <strong>New Campaign</strong>
          </Button>
        </div>
      </div>
      <div className='influence_doante_workspace'>
        <div data-aos="fade-up-left" data-aos-duration="1200" className="influence_donate">
          <p>Or do <strong>YOU</strong> want to <strong>DONATE</strong> to a <strong>CAMPAIGN</strong> ?</p>
          <p className='hide'>Do <strong>IT</strong> right <strong>NOW</strong>:</p>
          <Button className='btn-redirect' variant='dark' onClick={() => redirectTo("/campaigns")}>
            <strong>Campaigns</strong>
          </Button>
        </div>
      </div>
      <div className='info-workspace' data-aos="flip-up" data-aos-duration="1200">
        <div className="information">
          <p>
            Total Accounts on site:
          </p>
          <p className='info-num'>
            {accountsCount}
          </p>
        </div>
        <div data-aos="flip-up" data-aos-duration="2000" className="information">
          <p>
            Total Campaigns on site:
          </p>
          <p className='info-num'>
            {campaignsCount}
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Home;

import './home.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function Home() {
AOS.init();
let navigate = useNavigate();
  return (
    <Container>
        <div className="index_page">
          <h1 data-aos="fade-in"  data-aos-duration="1200"className="title">&nbsp;ADHD GRANDE Crowdfunding&nbsp;</h1>
        </div>
        <div data-aos="fade-left" data-aos-duration="1200" className='descriptive_div'>
          <div className='workspace_descriptive' onClick={() => navigate('/about_us')} >
            The Best Platform For Crowdfunding Of Any Kind.
          </div>
        </div>
        <div className='influence_campaign_workspace'>
        <div data-aos="fade-up-right" data-aos-duration="1200" className="influence_campaign">
            <p>Intereseted in opening a campaign?</p>
            <p className='hide'>Open one NOW:</p>
            <Button className='btn-redirect' variant='dark' onClick={() => navigate('/open_campaign')}>
              <strong>New Campaign</strong>
            </Button>
        </div>
        </div>
        <div className='influence_doante_workspace'>
        <div data-aos="fade-up-left" data-aos-duration="1200" className="influence_donate">
            <p>Or do <strong>YOU</strong> want to <strong>DONATE</strong> to a <strong>CAMPAIGN</strong> ?</p>
            <p className='hide'>Do <strong>IT</strong> right <strong>NOW</strong>:</p>
            <Button className='btn-redirect' variant='dark' onClick={() => navigate('/campaigns')}>
              <strong>Campaigns</strong>
          </Button>
        </div>
        </div>
    </Container>
  );
};

export default Home;

import './home.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function Home() {
AOS.init();
let navigate = useNavigate();
  return (
    <Container>
        <div className="index_page">
          <h1 data-aos="fade-in" className="title">&nbsp;ADHD GRANDE Crowdfunding&nbsp;</h1>
        </div>
        <div data-aos="fade-left" className='descriptive_div'>
          <div className='workspace_descriptive' onClick={() => navigate('/about_us')} >
            The Best Platform For Crowdfunding Of Any Kind.
          </div>
        </div>
    </Container>
  );
};

export default Home;

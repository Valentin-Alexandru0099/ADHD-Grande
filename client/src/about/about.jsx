import me from '../image/img.png';
import {
    MDBBtn,
    MDBContainer,
    MDBIcon,
    MDBTypography,
    MDBRow,
    MDBCol,

} from 'mdb-react-ui-kit';

const buttonsStyle = {
    margin: '1%'
}

function About() {
    return (
        <MDBContainer style={{ textAlign: 'center' }}>
            <div className='container p-1'>
                <MDBTypography id='title' variant='h1'>ADHD GRANDE Crowdfunding</MDBTypography>
            </div>

            <div className='container p-3'>
                <MDBBtn rounded color='info' style={buttonsStyle} href="#site-info"><MDBIcon size='3x' fas icon="angle-double-down" /></MDBBtn>
            </div>

            <div className='container p-5'>

                <h1 id='site-info'>What's ADHD GRANDE ?</h1>
                <p> ADHD GRANDE, it's Alex's first React project where he's learning a LOT of new frameworks and tricks. 😁</p>
            </div>

            <div className='container p-3'>
                <MDBBtn rounded color='info' style={buttonsStyle} href="#site-info2"><MDBIcon size='3x' fas icon="angle-double-down" /></MDBBtn>
                <MDBBtn rounded color='success' style={buttonsStyle} href="#title"><MDBIcon size='3x' fas icon="angle-double-up" /></MDBBtn>
            </div>

            <div className='container p-5'>
                <h1 id='site-info2'>Why ADHD GRANDE ?</h1>
                <p> It's an easy and fun platform to work with.</p>
                <p> Enjoy your stay !</p>
                <p>💚</p>
            </div>

            <div className='container p-3'>
                <MDBBtn rounded color='info' style={buttonsStyle} href="#our_platform"><MDBIcon size='3x' fas icon="angle-double-down" /></MDBBtn>
                <MDBBtn rounded color='success' style={buttonsStyle} href="#site-info"><MDBIcon size='3x' fas icon="angle-double-up" /></MDBBtn>
            </div>

            <div className='container p-3'>
                <h1 id='our_platform'>Platform</h1>
                <p>ADHD GRANDE is a Crowdfunding platform made out of scratch.</p>
                <p>We try to offer the easiest and fun experience for our users !</p>
                <p>Technologies used to create this platform are:</p>
                <ul>
                    <li>
                        <MDBIcon size='2x' fab icon="java" /> Java
                    </li>
                    <li>
                        <MDBIcon size='2x' fab icon="react" />React
                    </li>
                    <li>
                        <MDBIcon size='2x' fab icon="mdb" /> Material Design for Bootstrap
                    </li>
                    <li>
                        <MDBIcon size='2x' fas icon="shield-alt" /> Spring Security + Spring Boot
                    </li>
                    <li>
                        <MDBIcon size='2x' fas icon="republican" /> PgAdmin SQL
                    </li>
                    <li>
                        <MDBIcon size='2x' fab icon="html5" /> HTML
                    </li>
                    <li>
                        <MDBIcon size='2x' fab icon="js-square" /> JavaScript
                    </li>
                    <li>
                        <MDBIcon size='2x' fas icon="route" /> Axios
                    </li>
                    <li>
                        <MDBIcon size='2x' fas icon="brain" /> IntelliJ
                    </li>
                    <li>
                        <MDBIcon size='2x' fas icon="blind" /> Postman
                    </li>
                    <li>
                        <MDBIcon size='2x' fab icon="github" /> Github &amp; Git
                    </li>
                    <li>
                        <MDBIcon size='2x' fab icon="free-code-camp" /> Visual Studio Code
                    </li>
                </ul>
            </div>

            <div className='container p-3'>
                <MDBBtn rounded color='info' style={buttonsStyle} href="#our_developers"><MDBIcon size='3x' fas icon="angle-double-down" /></MDBBtn>
                <MDBBtn rounded color='success' style={buttonsStyle} href="#site-info2"><MDBIcon size='3x' fas icon="angle-double-up" /></MDBBtn>
            </div>

            <div className='container p-3'>
                <h1 id='our_developers'>Developers</h1>
                <MDBRow>
                    <MDBCol md='8' className='col-example'>
                        <h3>
                            Alexandru Dumitru High Definition ( ADHD )
                        </h3>
                        <MDBTypography className='lead mb-0'>
                            I'm 21 years old, coding made me decide to start my career out of it !
                        </MDBTypography>

                    </MDBCol>
                    <MDBCol md='2' className='col-example' style={{ margin: '1%' }}>
                        <img src={me} className='img-fluid shadow-4' alt='...' />
                    </MDBCol>
                </MDBRow>
            </div>

            <div className='container p-3'>
                <MDBBtn rounded color='info' style={buttonsStyle} href="#our_mission"><MDBIcon size='3x' fas icon="angle-double-down" /></MDBBtn>
                <MDBBtn rounded color='success' style={buttonsStyle} href="#our_platform"><MDBIcon size='3x' fas icon="angle-double-up" /></MDBBtn>
            </div>

            <div className='container p-3'>
                <h1 id='our_mission'>Mission</h1>
                <p>This platform mission is to progress and evolve as much as users need it to. </p>
                <p>We devoted our Advanced Module to design this beautiful website.</p>
                <p>Any feedback you want to share with us, feel free to use any of the contact methods down below. <a href='#footer'>click here</a></p>
            </div>

            <div className='container p-3'>
                <MDBBtn rounded color='success' style={buttonsStyle} href="#our_developers"><MDBIcon size='3x' fas icon="angle-double-up" /></MDBBtn>
            </div>

        </MDBContainer >
    );
};

export default About;

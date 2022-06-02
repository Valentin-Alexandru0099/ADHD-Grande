import { Container } from "react-bootstrap";
import './footer.css';

function PageFooter(){
const links = ["https://www.facebook.com", "https://www.pinterest.com", "https://www.twitter.com", "https://www.instagram.com"];
const icons = ["fa fa-facebook","fa fa-pinterest", "fa fa-twitter", "fa fa-instagram"];
const about_us = ["/about_us#our_platform", "/about_us#our_developers", "/about_us#our_mission"];
const names = ["Our Platform", "Our Developers", "Our Mission"];
    return (
    <footer className="footer">
        <Container id="footer">
            <div className="col1">
                About:<br/>
                {about_us.map((about, index) => <p key={index}><a href={about} key={index}>{names[index]}</a></p>)}
            </div>
            <div className="col2">
                Contact:<br/>
                <a  href="https://wa.me/+40770000000"
                    className="whatsapp"
                    target="_blank"
                    rel="noopener noreferrer">
                <i className="fa fa-whatsapp"> Message now!</i></a><br/>
                <a target="_blank" id="address" href="https://www.google.com/maps/place/Strada+Semilunei+4,+București+030167/@44.439061,26.1103133,17z/data=!3m1!4b1!4m5!3m4!1s0x40b1ff3720fc05a1:0x916032a35d575c4e!8m2!3d44.439061!4d26.112502">Strada Semilunei 4-6, București 020797</a>
                <i className="fa fa-envelope"><a id="email" href="mailto:adhd@gamil.com>"> adhdGRANDE@gmail.com </a></i>
                
            </div>
            <div className="col3">
                Media:<br/>
                {links.map((link, index) =><a href={link} key={index} target='_blank' className={icons[index]}></a>)}
            </div>            
        </Container>
    </footer>
        );
    };

    export default PageFooter;
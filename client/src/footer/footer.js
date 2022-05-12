import { Container } from "react-bootstrap";
import './footer.css';

function PageFooter(){
const links = ["www.facebook.com", "www.pinterest.com", "www.twitter.com", "www.instagram.com"];
const icons = ["fa fa-facebook","fa fa-twitter", "fa fa-instagram", "fa fa-pinterest"];

    return (
    <footer>
        <Container id="footer">
            <div className="col1">
                About:
                <p>our platform</p>
                <p>our developers</p>
                <p>our mission</p>
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
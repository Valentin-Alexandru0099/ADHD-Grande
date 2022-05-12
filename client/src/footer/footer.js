import { Container } from "react-bootstrap";
import './footer.css';

function PageFooter(){
    return (
    <footer>
        <Container id="footer">
            <div className="col1">
                <p>About:</p>
                <p>our platform</p>
                <p>our developers</p>
                <p>our mission</p>
            </div>
            <div className="col2">
                <p>Contact:</p>
                <p>phone</p>
                <p>address</p>
                <p>email</p>
            </div>
            <div className="col3">
                <p>Media:</p>
                <p>facebook</p>
                <p>instagram</p>
                <p>twiter</p>
            </div>            
        </Container>
    </footer>
        );
    };

    export default PageFooter;
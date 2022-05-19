import 'bootstrap/dist/css/bootstrap.min.css';
import { FormControl, Image, Nav, Navbar, Form, Container, NavDropdown } from 'react-bootstrap';
import me from '../images/img.png';
import defaultUser from "../images/default_user.png";
import "./navbar.css";

function PageNavBar() {

  return (
    <div>
      <Navbar id="nav" sticky="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <Image src={me} width='20%'>
            </Image>
            ADHD GRANDE
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/campaigns">Campaigns</Nav.Link>
              <Nav.Link href="/about_us">About Us</Nav.Link>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
              </Form>
            </Nav>
            <Nav className="user-dropdown">
            <NavDropdown title={
              <>
                <img src={defaultUser} width='25%'></img>&nbsp;
                Account
              </>
            }>
              <NavDropdown.Item href="#action/3.1">Register</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Log in</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          </Navbar.Collapse>
        </Container>
        
      </Navbar>
      
    </div>);
};

export default PageNavBar;
import 'bootstrap/dist/css/bootstrap.min.css';
import{FormControl, Image, Nav, Navbar, Form, Container}from 'react-bootstrap';
import me from '../images/img.png';

function PageNavBar(){
    return (
    <Navbar sticky="top" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <Image src={me} width='20%'>
          </Image>
          ADHD GRANDE
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">Campaigns</Nav.Link>
            <Nav.Link href="#">About Us</Nav.Link>
            <Form className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>);
    };

    export default PageNavBar;
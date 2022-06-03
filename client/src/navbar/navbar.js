import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, FormControl, Image, Nav, Navbar, Form, Container, NavDropdown } from 'react-bootstrap';
import me from '../image/img.png';
import defaultUser from "../image/default_user.png";
import "./navbar.css";

function PageNavBar() {

  function logout() {
    localStorage.clear();
  }

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
                  {
                    localStorage.getItem("username")
                      ? ("Hello " + localStorage.getItem("username"))
                      : ("Account")
                  }
                </>
              }>
                {
                  localStorage.getItem("userId")
                    ? (<><NavDropdown.Item href={"/user/" + localStorage.getItem("userId")}>User Page</NavDropdown.Item>
                      <Dropdown.Divider />
                      <NavDropdown.Item onClick={logout} href="/">Logout</NavDropdown.Item></>)

                    : (<><NavDropdown.Item href="/register">Register</NavDropdown.Item>
                      <NavDropdown.Item href="/login">Log in</NavDropdown.Item></>)
                }

              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>

      </Navbar>

    </div>);
};

export default PageNavBar;
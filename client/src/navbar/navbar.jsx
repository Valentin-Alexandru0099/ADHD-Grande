import 'bootstrap/dist/css/bootstrap.min.css';
import me from '../image/img.png';
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBDropdownLink
} from 'mdb-react-ui-kit';

import { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
  MDBNavbarNav,
} from 'mdb-react-ui-kit';

function PageNavBar({ activeUser }) {
  function logout() {
    localStorage.clear();
  };

  const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false);

  return (
    <>
      <MDBNavbar expand='lg' dark bgColor='success'>
        <MDBContainer>
          <MDBNavbarBrand href='/'>
            <img
              src={me}
              height='35'
              alt=''
              loading='lazy'
            />
            ADHD GRANDE</MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarTogglerDemo02'
            aria-controls='navbarTogglerDemo02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavNoTogglerSecond(!showNavNoTogglerSecond)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNavNoTogglerSecond}>
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
              <MDBNavbarItem>
                <MDBNavbarLink active aria-current='page' href='/'>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/campaigns'>Campaigns</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/about_us'>
                  About Us
                </MDBNavbarLink>
              </MDBNavbarItem>
              <form className='d-flex input w-auto'>
                <input type='search' className='form-control' placeholder='Search...' aria-label='Search' />
                <MDBNavbarLink active aria-current='page'>
                  <i className='fa fa-search'></i>
                </MDBNavbarLink>
              </form>
            </MDBNavbarNav>
            {
              localStorage.getItem("userId")
                ? (<><MDBDropdown group className='shadow-0'>
                  <MDBDropdownToggle rounded color='light'><i className='fa fa-user'></i>  Hi! {activeUser ? activeUser : localStorage.getItem("username")}</MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem>
                      <MDBDropdownLink href={"/user/" + localStorage.getItem("userId")}>User Page</MDBDropdownLink>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <MDBDropdownLink href={"/user/" + localStorage.getItem("userId") + "/achievements"}>Achievements</MDBDropdownLink>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <hr className='dropdown-divider' />
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <MDBDropdownLink href='/' onClick={logout}>Logout</MDBDropdownLink>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown></>)
                : (<><MDBDropdown group className='shadow-0'>
                  <MDBDropdownToggle rounded color='light'><i className='fa fa-user'></i>  Account</MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem>
                      <MDBDropdownLink href="/login">Log in</MDBDropdownLink>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <MDBDropdownLink href="/register">Register</MDBDropdownLink>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown></>)
            }

          </MDBCollapse >
        </MDBContainer >
      </MDBNavbar >
    </>
  );
};
export default PageNavBar;
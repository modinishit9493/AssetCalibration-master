import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import AuthContext from "../../store/auth-context";

const Navigation = (props) => {
  let navigate = useNavigate();
  const authCtx = useContext(AuthContext)

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    authCtx.logout();
    navigate("/");
  };

  return (
    <Navbar.Collapse id="responsive-navbar-nav">
      {props.isLoggedIn && (
        <Nav className="me-auto">
          <Nav.Link href="\assetlist">Asset List</Nav.Link>
          {/* <Nav.Link href="#pricing">Pricing</Nav.Link>
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
      )}
      {!props.isLoggedIn && <Nav className="me-auto"></Nav>}
      <Nav>
        {props.isLoggedIn && <Nav.Link href="#deets">Profile</Nav.Link>}
        {props.isLoggedIn && (
          <Nav.Link eventKey={2} onClick={handleLogout}>
            Logout
          </Nav.Link>
        )}
        {!props.isLoggedIn && (
          <Nav.Link eventKey={2} onClick={handleLogin}>
            Login
          </Nav.Link>
        )}
      </Nav>
    </Navbar.Collapse>
  );
};

export default Navigation;
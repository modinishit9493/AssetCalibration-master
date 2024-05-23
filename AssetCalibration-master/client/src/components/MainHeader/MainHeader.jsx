import React, { useContext } from "react";
import { Navbar, Container, Form, FormControl } from "react-bootstrap";
import {  NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context"; 

const MainHeader = (props) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  console.log(authCtx.getRole())

  const handleLogout = () => {
    authCtx.logout();
  };

  return (
    <React.Fragment>
      <Navbar expand="xs" className="nav-color w-100 " variant="dark">
        <Form.Group
          className={"ms-3 d-flex justify-content-end position-relative  me-3"}
        > 
          <NavLink className="me-3 btn-lbl" to="/">
            <i className="fas fa-home"> Asset Calibration</i>
             
          </NavLink>
          <i
            className={`bi bi-search fa-search position-absolute  top-50 translate-middle s-2`}
          ></i>
        </Form.Group>
        {isLoggedIn && (
          <button className="me-3 btn-lbl" onClick={handleLogout}>
            Logout
          </button>
        )}
        {!isLoggedIn && (
          <NavLink className="me-3 btn-lbl" to="/login">
            Login
          </NavLink>
        )}
      </Navbar>
      <div className="title-bar w-100 px-3">
        <div className="d-flex justify-content-between w-100">
          <NavLink className="text-sub-navbar" to='/'>
            MAINTENANCE {authCtx.getRole()}'S DASHBOARD
          </NavLink>
          {isLoggedIn &&(
            <div>
              <NavLink className="me-5 text-sub-navbar" to="/manageuser">
                <span className="me-3 ">Manage User</span>
              </NavLink>
              <NavLink className="text-sub-navbar" to="assetlist">
                Add Asset 
              </NavLink>
            </div>
          )}
           
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainHeader;

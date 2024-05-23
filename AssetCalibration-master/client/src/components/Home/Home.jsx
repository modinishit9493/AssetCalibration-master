import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
const Home = (props) => {
  let navigate = useNavigate();
  const authCtx = useContext(AuthContext)
  const islogin = authCtx.isLoggedIn;

  if(islogin === undefined || !islogin){
    navigate("/login");
  }
  return (
    <React.Fragment>
      <h1>Welcome back!</h1>
    </React.Fragment>
  );
};

export default Home;

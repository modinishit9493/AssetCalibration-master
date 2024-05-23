import React, { useState, useEffect, useCallback } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  getRole: () => {},
});

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  return {
    token: storedToken,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    //localStorage.removeItem('user');
  }, []);

  const loginHandler = (token) => {
    setToken(token.role);
    localStorage.setItem("token", token.role);
    //localStorage.setItem('user', JSON.stringify(token));
  };

  const RoleHandler = () => {
    //const role = JSON.parse(localStorage.getItem('user'))?.role.toUpperCase()
    //return role;
    return  token !== undefined && token !== null ? token : '';
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    getRole: RoleHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

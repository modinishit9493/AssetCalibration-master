import "./App.scss";
import React, { useContext } from "react";
import Home from "./components/Home/Home";
import CreateUser from "./components/CreateUser";
import ActiveUser from "./components/ActiveUser";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import AssetList from "./components/Forms/Asset/AssetList";
import AssetView from "./components/Forms/Asset/AssetView";
import Layout from "./components/UI/Layout/Layout";
import AuthContext from "./store/auth-context";
import ManageUserList from "./components/Forms/Users/ManageUserList";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<AssetList />}></Route>
        <Route
          path="/assetlist"
          element={authCtx.isLoggedIn ? <AssetList /> : <Login />}
        ></Route>
        <Route
          path="/assetview"
          element={<AssetView />}
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/manageuser"
          element={authCtx.isLoggedIn ? <ManageUserList /> : <Login />}
        ></Route>
        <Route path="/" element={<AssetList />}></Route>
        <Route path="/createUser" element={<CreateUser />}></Route>
        <Route path="/activeUser" element={<ActiveUser />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;

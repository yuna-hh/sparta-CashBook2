import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../Layout/HomePage";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import Join from "../pages/Join";
import DefaultLayout from "../Layout/DefaultLayout";
import { useContext } from "react";
import Mypage from "../pages/Mypage";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

const PublicRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? <Element {...rest} /> : <Navigate to="/mypage" />;
};
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/detail/:detailId" element={<Detail />}></Route>
          <Route
            path="/login"
            element={<PublicRoute element={Login} />}
          ></Route>
          <Route path="/join" element={<PublicRoute element={Join} />}></Route>
          <Route
            path="/mypage"
            element={<PrivateRoute element={Mypage} />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

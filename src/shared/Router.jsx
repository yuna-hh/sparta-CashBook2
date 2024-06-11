import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../Layout/HomePage";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import Join from "../pages/Join";
import DefaultLayout from "../Layout/DefaultLayout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/detail/:detailId" element={<Detail />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/join" element={<Join />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

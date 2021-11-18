import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./landingPage/base";

const Router_Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router_Main;

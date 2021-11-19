import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./landingPage/base";
import AboutUs from "./aboutUs/about_us";

const Router_Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router_Main;

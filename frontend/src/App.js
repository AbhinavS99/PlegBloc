import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./landing_page/Home";
import About from "./landing_page/About";
import Contact from "./landing_page/Contact";
import LogIn from "./landing_page/LogIn";
import Register from "./landing_page/Register";
import Navbar from "./landing_page/Navbar";

import AllContracts from "./main_page/AllContracts";
import Contributions from "./main_page/Contributions";
import PersonalCampaigns from "./main_page/PersonalCampaigns";
import CreateContract from "./main_page/CreateContract";
import Profile from "./main_page/Profile";
import MainNavBar from "./main_page/MainNavBar";

import Footer from "./Footer";

import { isAuthenticated } from "./auth/helper";

const App = () => {
  return (
    <>
      {!isAuthenticated() && <Navbar />}
      {isAuthenticated() && <MainNavBar />}
      <Routes>
        <Route end path="/" element={<Home />} />
        <Route end path="/about" element={<About />} />
        <Route end path="/contact" element={<Contact />} />
        <Route end path="/login" element={<LogIn />} />
        <Route end path="/register" element={<Register />} />

        <Route end path="/allcontracts" element={<AllContracts />} />
        <Route end path="/contributions" element={<Contributions />} />
        <Route end path="/personalcampaigns" element={<PersonalCampaigns />} />
        <Route end path="/createcontract" element={<CreateContract />} />
        <Route end path="/profile" element={<Profile />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

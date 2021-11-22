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
import Footer from "./Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route end path="/" element={<Home />} />
        <Route end path="/about" element={<About />} />
        <Route end path="/contact" element={<Contact />} />
        <Route end path="/login" element={<LogIn />} />
        <Route end path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

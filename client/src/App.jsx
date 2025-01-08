import React from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import LoadData from "./components/LoadData";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route index element={<LoadData />} />
        <Route path="/tabel" element={<LoadData />} />
        <Route path="/calculateconsumption" element={<Form />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Form from './components/Form';
import LoadData from './components/LoadData';
import Nav from './components/Nav';
import './App.css';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route index element={<LoadData />} />
          <Route path="/tabel" element={<LoadData />} />
          <Route path="/calculateconsumption" element={<Form />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;

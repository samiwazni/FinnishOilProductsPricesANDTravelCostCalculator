import React from 'react';
import Form from './components/Form';
import LoadData from './components/LoadData';
import Nav from './components/Nav';
import './App.css';

const App = () => {
  return (
    <div  className="max-w-2xl">
      <Nav />
      <Form />
      <LoadData />
    </div>
  );
};

export default App;

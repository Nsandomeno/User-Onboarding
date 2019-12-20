import React from 'react';
import logo from './logo.svg';
import './App.css';
import NewForm from "./Form.js";

function App() {
  return (
    <div className="App">
      <div className="Form" >
        <NewForm name="" email="" password="" />
      </div>
    </div>
  );
}

export default App;

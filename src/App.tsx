import React from 'react';
import './App.css';
import Register from './Register';
import {BrowserRouter, Route, Routes} from "react-router-dom"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import Register from './Register';
import Place from './Place';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./views/auth/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/newplace" element={<Place />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

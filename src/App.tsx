import React from 'react';
import './App.css';
import Register from './Register';
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import Register from './Register';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./views/auth/Login";
import { Rental } from './views/rentals/Rental';
import { sampleData } from './sampleData/Rentals';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/rental" element={<Rental {...sampleData[0]} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

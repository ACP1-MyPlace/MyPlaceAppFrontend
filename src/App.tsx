import React from 'react';
import './App.css';
import Register from './Register';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./views/auth/Login";
import LayoutHome from "./layouts/LayoutHome";
import NewPlace from "./views/places/NewPlace";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<LayoutHome />}>
            <Route path="/newplace" element={<NewPlace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

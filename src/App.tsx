import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./views/auth/Login";
import LayoutHome from "./layouts/LayoutHome";
import NewPlace from "./views/places/NewPlace";
import AuthPage from "./views/auth/AuthPage";
import { Rental } from './views/rentals/Rental';
import { sampleData } from './sampleData/Rentals';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/rental" element={<Rental {...sampleData[0]} />}/>

          <Route element={<LayoutHome />}>
            <Route path="/newplace" element={<NewPlace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

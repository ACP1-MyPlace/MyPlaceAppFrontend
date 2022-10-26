import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"

import AuthPage from "./views/auth/AuthPage";
import { Rental } from './views/rentals/Rental';
import { Rentals } from './views/allRentals/Rentals';
import { sampleData } from './sampleData/Rentals';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path="/auth" element={<AuthPage />} />
          <Route path="/rental" element={<Rental {...sampleData[0]} />}/>
          <Route path="/rentals" element={<Rentals {...sampleData} />}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

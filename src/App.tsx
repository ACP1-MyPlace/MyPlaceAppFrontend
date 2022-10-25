import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"

import AuthPage from "./views/auth/AuthPage";
import { Rental } from './views/rentals/Rental';
import { sampleData } from './sampleData/Rentals';
import { Booking } from './views/booking/Booking';
import { sampleData as bookingSD } from './sampleData/Booking';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path="/auth" element={<AuthPage />} />
          <Route path="/rental" element={<Rental {...sampleData[0]} />}/>
          <Route path="/booking" element={<Booking {...bookingSD}/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

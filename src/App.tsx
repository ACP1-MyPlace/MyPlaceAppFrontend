import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./views/auth/Login";
import LayoutHome from "./layouts/LayoutHome";
import NewPlace from "./views/places/NewPlace";
import AuthPage from "./views/auth/AuthPage";
import { Rental } from './views/rentals/Rental';
import { Rentals } from './views/allRentals/Rentals';
import { sampleData } from './sampleData/Rentals';
import { Booking } from './views/booking/Booking';
import { sampleData as bookingSD } from './sampleData/Booking';
import NavBar from './components/Navbar';

const NotLoggedInWeb = () => {
  return <>
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/auth" element={<AuthPage />} />
        </Routes>
  </>
}

const LoggedInWeb = () => {
  return <>
        <NavBar />
        <Routes>
          <Route path="/" element={<Rentals {...sampleData} />} />
          <Route path="/rental" element={<Rental {...sampleData[0]} />}/>
          <Route path="/booking" element={<Booking {...bookingSD}/>}/>
          <Route path="/rentals" element={<Rentals {...sampleData} />}/>

          <Route element={<LayoutHome />}>
            <Route path="/newplace" element={<NewPlace />} />
          </Route>
        </Routes>
  </>
}

function App() {
  const loggedIn = true // check if there is a token
  return (
    <div>
      <BrowserRouter>
        {!loggedIn && <NotLoggedInWeb />}
        {loggedIn && <LoggedInWeb />}
      </BrowserRouter>
    </div>
  );
}

export default App;

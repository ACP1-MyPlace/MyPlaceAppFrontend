import React, { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import LayoutHome from "./layouts/LayoutHome";
import NewPlace from "./views/places/NewPlace";
import AuthPage from "./views/auth/AuthPage";
import { Rental } from './views/rentals/Rental';
import { Rentals } from './views/allRentals/Rentals';
import { sampleData } from './sampleData/Rentals';
import { Booking } from './views/booking/Booking';
import { sampleData as bookingSD } from './sampleData/Booking';
import NavBar from './components/Navbar';
import {PrivateRoute} from "./components/PrivateRoute";
import {PublicWithoutUserRoute} from "./components/PublicWithoutUserRoute";
import {userStorage} from "./userSession/userStorage";
import { HostRoute } from './components/HostRoute';
import { TravelerRoute } from './components/TravelerRoute';

const NotLoggedInWeb = () => {
  return <>
        <Routes>
            <Route element={<PublicWithoutUserRoute />}>
                <Route path="/auth" element={<AuthPage />} />
            </Route>
        </Routes>
  </>
}

const LoggedInWeb = () => {

  return <>
        <Routes>
          <Route element={<LayoutHome />}>
            <Route element={<PrivateRoute />}>

                    <Route path="/" element={<Rentals {...sampleData} />} />
                    <Route path="/rental" element={<Rental {...sampleData[0]} />}/>
                    
                    <Route path="/rentals" element={<Rentals {...sampleData} />}/>
                    <Route element={<HostRoute />}>
                      <Route path="/newplace" element={<NewPlace />} />
                    </Route>
                    <Route element={<TravelerRoute />}>
                      <Route path="/booking" element={<Booking {...bookingSD}/>}/>
                    </Route>
            </Route>
          </Route>
        </Routes>
  </>
}

function App() {
    return (
        <div>
            <BrowserRouter>
                <NotLoggedInWeb />
                <LoggedInWeb />
            </BrowserRouter>
        </div>
    );
}

export default App;

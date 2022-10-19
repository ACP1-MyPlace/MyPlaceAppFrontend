import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import AuthPage from "./views/auth/AuthPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

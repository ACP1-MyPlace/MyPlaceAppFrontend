import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { userStorage } from "../userSession/userStorage";

export const PrivateRoute = () => {
    let location = useLocation();
    let auth : boolean = userStorage.isLogged();

    return auth ? <Outlet /> : <Navigate to="/auth" state={{ from: location }} replace />;
}

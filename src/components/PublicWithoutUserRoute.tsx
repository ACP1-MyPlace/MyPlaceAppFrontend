import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { userStorage } from "../userSession/userStorage";

export const PublicWithoutUserRoute = () => {
    let location = useLocation();
    let auth : boolean = userStorage.isLogged();

    return auth ? <Navigate to="/" state={{ from: location }} replace /> : <Outlet />;
}

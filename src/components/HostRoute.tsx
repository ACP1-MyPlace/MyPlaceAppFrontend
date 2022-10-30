import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { userStorage } from "../userSession/userStorage";

export const HostRoute = () => {
    let location = useLocation();
    let isHost : boolean = userStorage.isHost();

    return isHost ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
}
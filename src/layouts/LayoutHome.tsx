import React from "react";
import {Outlet} from 'react-router-dom';
import {Container} from "@mui/material";
import NavBar from "../components/Navbar";

interface LayoutHomeProps {
    children?: React.ReactNode
}

function LayoutHome({ children }: LayoutHomeProps) {
    return (
        <>
            <NavBar />
            <Container maxWidth="xl" sx={{ paddingTop: 5 }}>
                {children}
    
                <Outlet/>
            </Container>
        </>
    );
}

export default LayoutHome;
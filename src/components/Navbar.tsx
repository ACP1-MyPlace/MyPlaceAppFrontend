import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import {userStorage} from "../userSession/userStorage";
import './navbar.css'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {ListItemIcon} from "@mui/material";

const renderHostActions = () => {
    return (
        <Link className="nav-link" to="/newplace" style={{ color: 'grey' }}>Añadir nuevo alojamiento</Link>
    )
}


const NavBar = () => {
    let navigate = useNavigate();
    const isHost = userStorage.isHost()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => setAnchorEl(null);
    const logOut = () => {
        userStorage.logOutUser()
        navigate("/auth")
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={logOut}>
                <ListItemIcon>
                    <LogoutRoundedIcon fontSize="small" />
                </ListItemIcon>
                Salir
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "white"}}>
                <Toolbar>                    
                    <Link className="navbar-brand" to="/" style={{'color':'#E74562'}}>My Place</Link>
                    
                    <Link className="nav-link"
                          to="/rentals"
                          style={{ color: 'grey' }}
                    >
                        Alojamientos
                    </Link>
                    
                    {isHost && renderHostActions()}

                    <Link className="nav-link" to="/reservations" style={{ color: 'grey' }}>Reservas</Link>
                    
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="primary"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box>
    );

};

export default NavBar;
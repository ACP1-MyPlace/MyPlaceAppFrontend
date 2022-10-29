import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {userStorage} from "../userSession/userStorage";
import './navbar.css'

const renderHostActions = () => {
    return (
        <li className="nav-item active">
            <Link className="nav-link" to="/newplace">Añadir nuevo alojamiento</Link>
        </li>
    )
}

const NavBar = () => {

    const [isHost, setHost] = useState(false)
    useEffect(() => {
        setHost(userStorage.isHost())
    })

	return (
        <div className='container'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-header">
                
                <Link className="navbar-brand" to="/" style={{'color':'#E74562'}}>My Place</Link>
            
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                        <li className="nav-item active">
                            <Link className="nav-link" to="/rentals">Alojamientos</Link>
                        </li>

                        {isHost && renderHostActions()}

                        <li className="nav-item active">
                            <Link className="nav-link" to="/auth" onClick={() => userStorage.logOutUser()}>Log out</Link>
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
	);
};

export default NavBar;
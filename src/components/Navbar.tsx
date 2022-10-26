import React from 'react';
import { Link } from "react-router-dom";

const NavBar = () => {

	return (
        <div className='container'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                
                <Link className="navbar-brand" to="/" style={{'color':'#E74562'}}>My Place</Link>
            
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                        <li className="nav-item active">
                            <Link className="nav-link" to="/rentals">Alojamientos</Link>
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
	);
};

export default NavBar;
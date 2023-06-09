import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function Navbar() {
    let history = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        history("/");

    };
    let location = useLocation();
    useEffect(() => {
        // console.log(location.pathname);
    }, [ location ]);
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">myNotebook</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className={`nav-link ${location.pathname === "/" ? 'active' : ''}`} aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={`nav-link ${location.pathname === "/about" ? 'active' : ''}`} to="/about">About</NavLink>
                        </li>

                    </ul>
                    {!localStorage.getItem('token') ?
                        <form className="d-flex" role="search">
                            <NavLink className="btn btn-primary mx-2" to='login' role="button">Login</NavLink>
                            <NavLink className="btn btn-primary mx-2" to='signup' role="button">Sign Up</NavLink>
                        </form> : <button onClick={handleLogout} className='btn btn-primary'>Logout</button>
                    }
                </div>
            </div>
        </nav >
    );
}

export default Navbar;
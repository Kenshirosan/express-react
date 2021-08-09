import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
        >
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink
                            exact
                            className="nav-link"
                            aria-current="page"
                            to="/dashboard"
                        >
                            <span data-feather="home" />
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            aria-current="page"
                            to="/profile/me"
                        >
                            <span data-feather="home" />
                            Votre Profile
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            exact
                            className="nav-link"
                            aria-current="page"
                            to="/dashboard/categories"
                        >
                            <span data-feather="home" />
                            Categories
                        </NavLink>
                    </li>
                </ul>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Titre de séparation</span>
                </h6>
                <ul className="nav flex-column mb-2">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="#">
                            <span data-feather="file-text" />
                            Exemple de séparation
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Nav;

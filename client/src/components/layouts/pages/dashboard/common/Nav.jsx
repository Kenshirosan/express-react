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
                            to="/"
                        >
                            <span className="fas fa-blog" /> Blog
                        </NavLink>
                        <NavLink
                            exact
                            className="nav-link"
                            aria-current="page"
                            to="/dashboard"
                        >
                            <span className="fas fa-home" /> Dashboard
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            aria-current="page"
                            to="/profile/me"
                        >
                            <span className="fas fa-users" /> Votre Profile
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            aria-current="page"
                            to="/dashboard/roles"
                        >
                            <span className="fas fa-user-lock" /> Gestion des
                            Rôles
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            exact
                            className="nav-link"
                            aria-current="page"
                            to="/dashboard/categories"
                        >
                            <span className="fas fa-file" /> Categories
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            exact
                            className="nav-link"
                            aria-current="page"
                            to="/dashboard/articles"
                        >
                            <span className="fas fa-pen" /> Articles
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

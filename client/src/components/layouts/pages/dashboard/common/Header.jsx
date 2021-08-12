import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/">
                Super Blog
            </Link>

            <div className="navbar-nav">
                {/*Implémenter logout*/}
                <div className="nav-item text-nowrap">
                    <a className="nav-link px-3" href="!#">
                        Sign out
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;

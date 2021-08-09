import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

const Header = ({ links }) => {
    function logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        window.location = '/'; // Pas idéal
    }

    return (
        <div className="container">
            <header className="blog-header py-3">
                <div className="row flex-nowrap justify-content-between align-items-center">
                    <div className="col-4 pt-1">
                        {localStorage.getItem('user') === null ? (
                            <NavLink className="link-secondary" to="/login">
                                Login
                            </NavLink>
                        ) : (
                            <NavLink className="link-secondary" to="/dashboard">
                                Dashboard
                            </NavLink>
                        )}
                    </div>
                    <div className="col-4 text-center">
                        <Link className="blog-header-logo text-dark" to="/">
                            Large
                        </Link>
                    </div>
                    <div className="col-4 d-flex justify-content-end align-items-center">
                        <Link
                            className="link-secondary"
                            to="/"
                            aria-label="Search"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="mx-3"
                                role="img"
                                viewBox="0 0 24 24"
                            >
                                <title>Search</title>
                                <circle cx="10.5" cy="10.5" r="7.5" />
                                <path d="M21 21l-5.2-5.2" />
                            </svg>
                        </Link>
                        {localStorage.getItem('user') === null ? (
                            <Link
                                className="btn btn-sm btn-outline-secondary"
                                to="/register"
                            >
                                Sign up
                            </Link>
                        ) : (
                            <NavLink
                                className="link-secondary"
                                to="/logout"
                                onClick={logout}
                            >
                                Logout
                            </NavLink>
                        )}
                    </div>
                </div>
            </header>

            <div className="nav-scroller py-1 mb-2">
                <nav className="nav d-flex justify-content-between">
                    {links.map((link, index) => (
                        <button
                            key={index}
                            style={noStyle}
                            className="p-2 link-secondary"
                        >
                            {link}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};

const noStyle = {
    background: 'transparent',
    border: 'none',
    textDecoration: 'underline',
};

Header.propTypes = {
    links: PropTypes.array.isRequired,
};

export default Header;

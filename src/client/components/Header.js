import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <nav>
            <div className="nav-wrapper">
                <Link
                    to="/"
                    className="brand-logo"
                >Home</Link>
                <ul className="right">
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/todo">Todo</Link></li>
                    <li><Link to="/bathrooms">Bathrooms</Link></li>
                </ul>
            </div>
        </nav>

    )
}
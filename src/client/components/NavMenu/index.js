import React from 'react';
import {Link} from 'react-router-dom';

export const NavMenu = () => {
    return (
        <header>
            <nav>
                <div className="nav-wrapper blue-grey lighten-1">
                    <Link
                        to="/"
                        className="brand-logo center"
                    >Бани</Link>
                    <ul className="left">
                        <li><Link to="/">Главная</Link></li>
                        <li><Link to="/contacts">Контакты</Link></li>
                        <li><Link to="/bathrooms">Категории</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}
import React from 'react';
import {Link} from 'react-router-dom';

export default () => {
    const isrender = () => {
        console.log('ia rendered')
    }
    return (
        <header>
            <nav>
                <div className="nav-wrapper blue-grey lighten-1">
                    <Link
                        to="/"
                        className="brand-logo center"
                    >Бани</Link>
                    {isrender()}
                    <ul className="left">
                        <li><Link to="/">Главная</Link></li>
                        <li><Link to="/contacts">Контакты</Link></li>
                        {/*<li><Link to="/bathrooms">Bathrooms</Link></li>*/}
                    </ul>
                </div>
            </nav>
        </header>
    )
}
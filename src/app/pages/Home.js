import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <Link to="/about">About</Link>
            <br/>
            <Link to="/todo">Todo</Link>
            <br/>
            <Link to="/bathrooms">Bathrooms</Link>
        </div>
    )
}

export default {
    component: Home
}
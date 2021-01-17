import React from 'react';
import {renderRoutes} from 'react-router-config';

import { NavMenu } from "./components/NavMenu";
import { Footer } from "./components/Footer";
import './App.scss';

const App = ({location, route}) => {

    return (
        <React.Fragment>
            <NavMenu/>
            <main className="container">{renderRoutes(route.routes)}</main>
            <Footer/>
        </React.Fragment>
    )
}

App.defaultProps = {
    route: null
}

export default {
    component: App
};
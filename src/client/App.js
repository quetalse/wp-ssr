import React from 'react';
import {renderRoutes} from 'react-router-config';
import { Helmet } from 'react-helmet';

import Header from "./components/Header";
import Footer from "./components/Footer";
import './App.scss';

const renderSiteMeta = (location) => {
    const canonical = location.pathname.toLowerCase();
    return (<Helmet
            link={[{
                href: canonical,
                rel: 'canonical',
            }]}
            meta={[{
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            }]}
        />
    );
}

const App = ({location, route}) => {

    return (
        <React.Fragment>
            {/*{renderSiteMeta(location)}*/}
            <Header/>
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
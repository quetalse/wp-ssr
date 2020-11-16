import React from 'react';
import {renderRoutes} from 'react-router-config';
import { Helmet } from 'react-helmet';

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
            {renderRoutes(route.routes)}
        </React.Fragment>
    )
}

App.defaultProps = {
    route: null
}

export default {
    component: App
};
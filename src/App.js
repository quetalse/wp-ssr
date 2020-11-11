import React from 'react';
import {renderRoutes} from 'react-router-config';

import './App.scss';

const App = ({route}) => {
    return renderRoutes(route.routes)
}

App.defaultProps = {
    route: null
}

export default {
    component: App
};
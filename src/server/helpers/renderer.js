import React from 'react';
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import Routes from "../../Route";

// eslint-disable-next-line no-shadow
export const renderer = (req, store, context, helmetContext) => {



    return renderToString(
        <HelmetProvider context={helmetContext}>
            <Provider store={store}>
                <StaticRouter location={req.path} context={context}>
                    {renderRoutes(Routes)}
                </StaticRouter>
            </Provider>
        </HelmetProvider>
    );
};
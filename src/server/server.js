import '@babel/polyfill';
import fs from 'fs';
import path from 'path';

import Helmet from 'react-helmet';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import express from 'express';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';

import Routes from '../app/Route';
import { store } from '../app/store';
import { allSagas } from './store/sagas';
import { assetsByChunkName } from '../../build/stats.json';

const app = express();

app.use(express.static('build'));

// eslint-disable-next-line no-shadow
const renderer = (req, store, context) => {

    return renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={context}>
                {renderRoutes(Routes)}
            </StaticRouter>
        </Provider>
    );

//     const content = renderToString(
//         <Provider store={store}>
//         <StaticRouter location={req.path} context={context}>
//         <div>{renderRoutes(Routes)}</div>
//         </StaticRouter>
//         </Provider>
// );
//
//
//
//     return `<!DOCTYPE html>
//   <html lang="en">
//     <head>
//       <meta charset="UTF-8" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <meta http-equiv="X-UA-Compatible" content="ie=edge" />
//       <link rel="stylesheet" type="text/css" href="/${assetsByChunkName.main[0]}" />
//       <title>Document</title>
//     </head>
//     <body>
//       <div id="root">${content}</div>
//       <script>
//       window.__PRELOADED_STATE__ = ${serialize(store.getState()).replace(
//         /</g,
//         '\\u003c'
//     )}
//       </script>
//       <script src="/${assetsByChunkName.main[1]}"></script>
//     </body>
//   </html>`;

};

app.get('*', (req, res, next) => {
    const params = req.params[0].split('/');
    const id = params[2];
    const routes = matchRoutes(Routes, req.path);
    const indexFile = path.resolve('./build/template.html');

    // const promises = routes
    //     .map(({ route }) => {
    //         return route.loadData ? route.loadData(store, id) : null;
    //     })
    //     .map(promise => {
    //         if (promise) {
    //             // eslint-disable-next-line no-unused-vars
    //             return new Promise((resolve, reject) => {
    //                 promise
    //                     .then(resolve)
    //                     .catch(resolve);
    //             });
    //         }
    //         return null;
    //     });
    //
    // Promise.all(promises).then(() => {
    //     const context = {};
    //     const content = renderer(req, store, context);
    //
    //     if (context.notFound) {
    //         res.status(404);
    //     }
    //
    //
    //     fs.readFile(indexFile, 'utf-8', (err, data) => {
    //         if(err){
    //             console.log('Something went wrong:', err);
    //             return res.status(500).send('Oops, better luck next time!')
    //         }
    //
    //         const helmet = Helmet.renderStatic();
    //
    //         data = data.replace('__STYLES__', `/${assetsByChunkName.main[0]}`);
    //
    //         data = data.replace('__LOADER__', '');
    //         data = data.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
    //
    //         data = data.replace('<title></title>', helmet.title.toString());
    //         data = data.replace('<meta name="description" content=""/>', helmet.meta.toString());
    //         data = data.replace('<script>__INITIAL_DATA__</script>', `<script>window.__INITIAL_DATA__ = ${JSON.stringify(store.getState())};</script>`);
    //         data = data.replace('__CLIENT__SCRIPTS__', `/${assetsByChunkName.main[1]}`);
    //
    //         return res.send(data)
    //     })
    //
    //     // res.send(content);
    // });

    store.runSaga(allSagas.bathroomSaga, {url: 'http://react-ssr-api.herokuapp.com/users'}).done.then(() => {
        const context = {};
        const content = renderer(req, store, context);

        if (context.notFound) {
            res.status(404);
        }

        fs.readFile(indexFile, 'utf-8', (err, data) => {
            if(err){
                console.log('Something went wrong:', err);
                return res.status(500).send('Oops, better luck next time!')
            }
            const helmet = Helmet.renderStatic();

            data = data.replace('__STYLES__', `/${assetsByChunkName.main[0]}`);
            data = data.replace('__LOADER__', '');
            data = data.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
            data = data.replace('<title></title>', helmet.title.toString());
            data = data.replace('<meta name="description" content=""/>', helmet.meta.toString());
            data = data.replace('<script>__INITIAL_DATA__</script>', `<script>window.__INITIAL_DATA__ = ${JSON.stringify(store.getState())};</script>`);
            data = data.replace('__CLIENT__SCRIPTS__', `/${assetsByChunkName.main[1]}`);

            return res.send(data)
        })
    })
    store.close();
});

app.listen(3000, () => {
    console.log('😎 Server on port 3000');
})
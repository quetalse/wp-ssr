import '@babel/polyfill';
import fs from 'fs';
import path from 'path';

// process.env["NO_PROXY"]="*";

import { Helmet, HelmetProvider } from 'react-helmet-async';
import proxy from 'express-http-proxy';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import express from 'express';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';

import Routes from '../Route';
import { store } from '../store';
import { allSagas } from '../store/sagas';
import { assetsByChunkName } from '../../build/app/stats.json';

const app = express();

app.use('/api', proxy('http://jsonplaceholder.typicode.com/photos', {

}));
app.use(express.static('build/app'));

// fs.open('./build/state.js', 'w', function (err) {
//     if (err) throw err;
//     console.log('Saved!');
// });

// eslint-disable-next-line no-shadow
const renderer = (req, store, context, helmetContext) => {


    return renderToString(
        <HelmetProvider context={helmetContext}>
            <Provider store={store}>
                <StaticRouter location={req.path} context={context}>
                    {renderRoutes(Routes)}
                </StaticRouter>
            </Provider>
        </HelmetProvider>
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
    const routes = matchRoutes(Routes, req.path).pop();
    const indexFile = path.resolve('./build/app/template.html');

    // console.log('routes', routes)

    let saga = routes.route.saga || function* (){},
        sagaUrl = routes.route.sagaUrl || '',
        sagaUrlParam = routes.match.params.id || '',
        dataUrl = `${sagaUrl}/${sagaUrlParam}`,
        metaUrl = routes.route.sagaMetaUrl || '';

    console.log('dataUrl', dataUrl)
    console.log('metaUrl', metaUrl)
    // console.log('saga', saga)
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

    store.runSaga(saga, {dataUrl, metaUrl}).done
        .then(() => {

            const context = {};
            const helmetContext = {};
            const content = renderer(req, store, context, helmetContext);

            if (context.notFound) {
                res.status(404);
            }



            // fs.writeFile('./build/state.js', `window.__INITIAL_DATA__ = ${serialize(store.getState())}`, function (err) {
            //     if (err) throw err;
            //     console.log('Saved!');


            fs.readFile(indexFile, 'utf-8', (err, data) => {
                if(err){
                    console.log('Something went wrong:', err);
                    return res.status(500).send('Oops, better luck next time!')
                }

                const { helmet } = helmetContext;

                data = data.replace('__STYLES__', `/${assetsByChunkName.main[0]}`);
                data = data.replace('__LOADER__', '');
                data = data.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
                data = data.replace('<title></title>', helmet.title.toString());
                data = data.replace('<meta name="description" content=""/>', helmet.meta.toString());
                data = data.replace('<script>__INITIAL_DATA__</script>', `<script>window.__INITIAL_DATA__ = ${serialize(store.getState())}</script>`);
                data = data.replace('__CLIENT__SCRIPTS__', `/${assetsByChunkName.main[1]}`);

                return res.send(data)
            })
    })
    .catch((e) => {
        console.log({ message: e.message, source: 'sagaError', stacktrace: e.sagaStack })
    })
    store.close();
});

app.listen(3000, () => {
    console.log('😎 Server on port 3000');
})
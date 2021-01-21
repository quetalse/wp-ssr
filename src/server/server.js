import '@babel/polyfill';
import fs from 'fs';
import path from 'path';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import proxy from 'express-http-proxy';

import { renderer } from "./helpers/renderer";
import Routes from '../Route';
import configureStore from '../store';
import { assetsByChunkName } from '../../build/app/stats.json';
import { rootSaga } from "../store/sagas/root";
import { dataPageTemplate } from '../store/sagas/helpers'

const PORT = process.env.__APP_PORT__;

const app = express();
const indexFile = path.resolve('./build/app/template.html');

global.__SERVER__ = true;
global.__CLIENT__ = false;

app.use(require('express-status-monitor')());
app.use(express.static('build/'));
app.get('*', (req, res, next) => {

    // const params = req.params[0].split('/');
    // const id = params[2];
    const routes = matchRoutes(Routes, req.path).pop();
    const store = configureStore();

    const saga = rootSaga,
          routeData = {
              name: "route",
              url: `${req.originalUrl}`
          },
          pageData = dataPageTemplate(req.originalUrl),
          componentData = routes.route.serverSagaData


    // console.log("||||||||||||||||||||||||||||||||||||||||||||||||||||||")
    // console.log('req.originalUrl',req.originalUrl)
    // console.log('///////////////////', [...componentData, ...pageData])
    // console.log('||||||||||||||||||||||||||||||||||||||||||||||||||||||')

    store.runSaga(saga, [...componentData, routeData,...pageData]).done.then(() => {
            const context = {};
            const helmetContext = {};
            const content = renderer(req, store, context, helmetContext);

            if (context.notFound) {
                res.status(404);
            }

            fs.readFile(indexFile, 'utf-8', (err, data) => {
                if(err){
                    console.log('Something went wrong:', err);
                    return res.status(500).send('Oops, better luck next time!')
                }

                const { helmet } = helmetContext;

                // console.log('getState', store.getState())


                data = data.replace('__STYLES__', `/app/${assetsByChunkName.main[0]}`);
                data = data.replace('__LOADER__', '');
                data = data.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
                data = data.replace('<title></title>', helmet.title.toString());
                data = data.replace('<meta name="description" content=""/>', helmet.meta.toString());
                data = data.replace('<script>__INITIAL_DATA__</script>', `<script>window.__INITIAL_DATA__ = ${serialize(store.getState())}</script>`);
                // data = data.replace('<script>__INITIAL_DATA__</script>', `<script>window.__INITIAL_DATA__ = ${serialize(initalData)}</script>`);
                data = data.replace('__CLIENT__SCRIPTS__', `/app/${assetsByChunkName.main[1]}`);

                return res.send(data)
                // return res.send('1')
            })
    })
    .catch((e) => {
        console.log({ message: e.message, source: 'sagaError', stacktrace: e.sagaStack })
    })
    store.close();
});

app.listen(PORT, () => {
    console.log(`😎 Server on port ${PORT}`);
});


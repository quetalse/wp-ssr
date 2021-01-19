import '@babel/polyfill';
import open from 'open';
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

const app = express();
const indexFile = path.resolve('./build/app/template.html');

global.__SERVER__ = true;
global.__CLIENT__ = false;

const PORT = 3000;
const _apiBase = process.env.__API_BASE__;


app.use(require('express-status-monitor')());
app.use(express.static('build/'));

app.get('*', (req, res, next) => {

    console.log('req', req.originalUrl)
    // console.log('res', res)
    // global.__URL__ = req.protocol + '://' + req.get('host');
    // console.log('__URL__', __URL__)
    // console.log('req.protocol', req.protocol)
    // console.log('eq.get(\'host\'', req.get('host'))
    // console.log('req.originalUrl', req.originalUrl)


    const appPage = [{
        name: 'page',
        url: [
            {name: 'page',  url: `${_apiBase}/api/page${req.originalUrl}`},
        ]
    }]

    // console.log('appPage', appPage);

    const params = req.params[0].split('/');
    const id = params[2];
    const routes = matchRoutes(Routes, req.path).pop();
    const store = configureStore();


    // const saga = routes.route.saga || function* (){}
    const saga = rootSaga

    //       sagaUrl = routes.route.sagaUrl || '',
    //       sagaUrlParam = routes.match.params.id || '',
    //       dataUrl = `${sagaUrl}/${sagaUrlParam}`,
    //       metaUrl = routes.route.sagaMetaUrl || '';

    const dataUrls = routes.route.serverSagaData;

    // console.log('dataUrls', dataUrls);

    store.runSaga(saga, [...dataUrls, ...appPage]).done.then(() => {
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

                // let initalData = store.getState();

                // console.log('getState', store.getState())
                // keysSsrIgnore.forEach((key) => {
                //     // console.log(key)
                //     if(initalData[stateKey].data[key]){
                //         delete initalData[stateKey].data[key]
                //     }
                // });
                //
                // console.log(initalData[stateKey])

                data = data.replace('__STYLES__', `/app/${assetsByChunkName.main[0]}`);
                data = data.replace('__LOADER__', '');
                data = data.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
                data = data.replace('<title></title>', helmet.title.toString());
                data = data.replace('<meta name="description" content=""/>', helmet.meta.toString());
                data = data.replace('<script>__INITIAL_DATA__</script>', `<script>window.__INITIAL_DATA__ = ${serialize(store.getState())}</script>`);
                // data = data.replace('<script>__INITIAL_DATA__</script>', `<script>window.__INITIAL_DATA__ = ${serialize(initalData)}</script>`);
                data = data.replace('__CLIENT__SCRIPTS__', `/app/${assetsByChunkName.main[1]}`);

                return res.send(data)
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


// (async () => {
    // open(`http://localhost:${PORT}`, {app: 'google-chrome'});
// })();



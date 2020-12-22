import '@babel/polyfill';

import fs from 'fs';
import path from 'path';
import express from 'express';
import { makeServer } from "./mockServer";

import { matchRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import proxy from 'express-http-proxy';

import { renderer } from "./helpers/renderer";
import Routes from '../Route';
import configureStore from '../store';
import { assetsByChunkName } from '../../build/app/stats.json';


const app = express();
const indexFile = path.resolve('./build/app/template.html');


makeServer({ environment: "development" })

app.use('/api', proxy('http://jsonplaceholder.typicode.com/photos', {

}));

app.use(express.static('build/app'));

app.get('*', (req, res, next) => {
    const params = req.params[0].split('/');
    const id = params[2];
    const routes = matchRoutes(Routes, req.path).pop();
    const store = configureStore();

    // console.log('routes', routes)

    const saga = routes.route.saga || function* (){}
    //       sagaUrl = routes.route.sagaUrl || '',
    //       sagaUrlParam = routes.match.params.id || '',
    //       dataUrl = `${sagaUrl}/${sagaUrlParam}`,
    //       metaUrl = routes.route.sagaMetaUrl || '';

    const dataUrls = routes.route.serverSagaData;
    const {keysSsrIgnore} = routes.route;
    const {stateKey} = routes.route;

    store.runSaga(saga, dataUrls).done
    .then(() => {
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

                // console.log(initalData[stateKey])
                // keysSsrIgnore.forEach((key) => {
                //     // console.log(key)
                //     if(initalData[stateKey].data[key]){
                //         delete initalData[stateKey].data[key]
                //     }
                // });
                //
                // console.log(initalData[stateKey])


                data = data.replace('__STYLES__', `/${assetsByChunkName.main[0]}`);
                data = data.replace('__LOADER__', '');
                data = data.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
                data = data.replace('<title></title>', helmet.title.toString());
                data = data.replace('<meta name="description" content=""/>', helmet.meta.toString());
                data = data.replace('<script>__INITIAL_DATA__</script>', `<script>window.__INITIAL_DATA__ = ${serialize(store.getState())}</script>`);
                // data = data.replace('<script>__INITIAL_DATA__</script>', `<script>window.__INITIAL_DATA__ = ${serialize(initalData)}</script>`);
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
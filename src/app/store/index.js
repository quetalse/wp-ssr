import {createStore, applyMiddleware, compose} from "redux";
import createSagaMiddleware, { END } from 'redux-saga';
import thunk from "redux-thunk";
import reducers from './reducers';

const sagaMiddleware = createSagaMiddleware();
const middleware = [thunk, sagaMiddleware];

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            shouldHotReload: false,
        })
        : compose;
/* eslint-enable */


let state;

if (typeof window !== 'undefined') {
    state = window.__INITIAL_DATA__;
    delete window.__INITIAL_DATA__;
}

const store = createStore(
    reducers,
    state,
    composeEnhancers(applyMiddleware(...middleware))
    // applyMiddleware(sagaMiddleware)
);
store.runSaga = sagaMiddleware.run;
console.log('store', store)
store.close = () => store.dispatch(END);
// sagaMiddleware.run(rootSaga);

export {store};
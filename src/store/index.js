import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";

import reducers from './reducers';

const middleware = [thunk];

// const composeEnhancers =
//     typeof window !== 'undefined'
//         ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//         : compose; // eslint-disable-line

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

console.log('state', state)
console.log('composeEnhancers', composeEnhancers)

const store = createStore(
    reducers,
    state,
    composeEnhancers(applyMiddleware(...middleware))
);

export {store};
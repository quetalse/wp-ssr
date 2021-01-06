import {createStore, applyMiddleware, compose} from "redux";
import createSagaMiddleware, { END } from 'redux-saga';
import thunk from "redux-thunk";
import reducers from './reducers';
import root from './reducers/root';
const sagaMiddleware = createSagaMiddleware();
const middleware = [thunk, sagaMiddleware];

export default function configureStore () {

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
        root,
        state,
        composeEnhancers(applyMiddleware(...middleware))
        // applyMiddleware(sagaMiddleware)
    );
    store.runSaga = (saga, params = {}) => {
        // console.log('params', params)
        return sagaMiddleware.run(saga, params)
    };
    store.close = () => store.dispatch(END);

    return store
}
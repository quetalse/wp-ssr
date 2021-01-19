import { all, fork } from 'redux-saga/effects';
import {clientPagePushRoute, clientPageSaga, pageSaga} from './page';
import { classifiersSaga, clientClassifiersSaga } from "./classifiers";
import { clientTopCategoriesSaga, topCategoriesSaga } from "./topCategories";

/**
 * Generator starts by SSR for fetching server data (source data provided from component export object key "serverSagaData")
 * @param arg - array of server data
 * @returns {Generator<*, void, *>}
 */
function* watchRoot(arg) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < arg.length; i++) {
        switch (arg[i].name) {
            case 'page':
                yield fork(pageSaga, arg[i]);
                break;
            // case 'classifiers':
            //     yield fork(classifiersSaga, arg[i]);
            //     break;
            case 'topCategories':
                yield fork(topCategoriesSaga, arg[i]);
                break;
            default:
        }
    }
    // yield fork(loadRoot, arg)
}

// Вызывается со стороны сервера при обработки запроса
export function* rootSaga(arg) {
    yield all([
        watchRoot(arg)
    ])
}

// Вызывается со стороны клиента
export function* clientRootSaga() {
    yield all([
        clientPageSaga(),
        clientClassifiersSaga(),
        clientTopCategoriesSaga(),
        clientPagePushRoute()
    ])
}
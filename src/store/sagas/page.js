import {all, call, fork, put, takeEvery, takeLatest} from 'redux-saga/effects';
import { sagaFetchPage, loadFetchPage, successFetchPage, failureFetchPage, dropField} from '../actions/page';
import {
    SAGA_FETCH_PAGE,
    LOAD_FETCH_PAGE,
    SUCCESS_FETCH_TOP_CATEGORIES,
    FAILURE_FETCH_HOME, SAGA_FETCH_CLASSIFIERS, PUSH_ROUTE_PAGE
} from "../types";
import { dataExtract, dataTemplate } from './helpers';

// Генератор запроса данных
function* loadPageData(dataUrls) {
    try{
        yield put(loadFetchPage())
        const data = yield call(dataExtract, dataUrls);
        console.log('DATa', data)
        yield put(successFetchPage(data))
    }catch(e){
        yield put(failureFetchPage(e))
    }
}

// Генератор запуска запроса данных со стороны сервера
export function* pageSaga(arg) {
    yield call(loadPageData, [arg]);
}

// Сага отслеживает событие получения данных о странице, запуская loadPageData
function* clientLoadPageData() {
    yield takeEvery(SAGA_FETCH_PAGE, function* (action){
        const { route } = action.payload; // содердит url для получения данных о page
        const data = dataTemplate(route);
        console.log(data);
        yield fork(loadPageData, [data])
    });
}

// Сага зупускается на клиенте, вызывает clientLoadPageData
export function* clientPageSaga() {
    yield call(clientLoadPageData);
}

// Сага диспатчит в редакс обнуление поля page
// (данные о странице сбрасываются перед переходм на новую)
// и с помощью history пушит новый роут
function* pagePushRoute({url, history}) {
    yield put(dropField(['page']))
    history.push(url);
}

// Сага отслеживает событие изменения роута и запускает pagePushRoute
export function* clientPagePushRoute(){
    // eslint-disable-next-line func-names
    yield takeEvery(PUSH_ROUTE_PAGE, function* (action){
        const data = action.payload;
        console.log('PUSH_ROUTE_PAGE', data)
        yield fork(pagePushRoute, data)
    });
}
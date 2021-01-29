import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { setRoute, dropRoute } from '../actions/route';

function* routeSagaData(route) {
    try{
        yield put(setRoute(route))
    }catch(e){
        console.log(e)
    }
}

export function* routeSaga(arg) {
    yield call(routeSagaData, arg);
}
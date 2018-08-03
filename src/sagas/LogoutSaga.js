import { put, take, call } from 'redux-saga/effects';
import * as types from '../actions/Types';
import { deleteAllFlashMessages } from '../actions/FlashMessage';
import { dispatchCurrentUser } from '../actions/Auth';

export function* logoutWatcher() {
    while (true) {
        yield take(types.LOGOUT);
        yield call(logout);
    }
}

function* logout() {
    localStorage.removeItem('token');
    yield put(deleteAllFlashMessages());
    yield put(dispatchCurrentUser(null));
} 
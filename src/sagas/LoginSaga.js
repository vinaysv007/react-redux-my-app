import { put, take, fork, call, cancel, cancelled } from 'redux-saga/effects';
import * as types from '../actions/Types';
import api from '../api/Api';
import { loginFailed, loginSuccess, dispatchCurrentUser } from '../actions/Auth';
import jwt from 'jwt-decode';
import { deleteAllFlashMessages } from '../actions/FlashMessage';

export function* loginWatcher() {
    while (true) {
        const data = yield take(types.LOGIN_REQUEST);
        const task = yield fork(authorize, data.payload);
        const action = yield take([types.LOGIN_FAILED, types.LOGOUT]);
        if (action === types.LOGOUT) {
            yield cancel(task);
        }
    }
}

function* authorize(data) {
    try {
        let respose = yield call(api.user.login, data);
        let token = respose.data.token;
        yield put(deleteAllFlashMessages());
        if (token != null) {
            yield put(loginSuccess(respose.data));
            let user = jwt(token);
            yield put(dispatchCurrentUser(user));
            localStorage.setItem('token', token);
        }
    } catch (e) {
        yield put(loginFailed(e.response));
    } finally {
        if (yield cancelled()) {
            console.log('app logged out completely...');
        }
    }
}

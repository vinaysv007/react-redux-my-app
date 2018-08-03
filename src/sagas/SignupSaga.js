import { call, takeLatest, put } from 'redux-saga/effects';
import * as types from '../actions/Types';
import api from '../api/Api';
import jwt from 'jwt-decode';
import { userSignUpScuccess, userSignUpFailed, errorUserExists, successUserExists, confirmUserFailed, confirmUserSuccess } from '../actions/User';
import { loginSuccess, dispatchCurrentUser } from '../actions/Auth';

export function* signupWatcher() {
    yield takeLatest(types.INVOKE_USER_EXISTS_REQUEST, checkUserExists);
    yield takeLatest(types.ADD_USER_REQUEST, addNewUser);
    yield takeLatest(types.USER_CONFIRM_REQUEST, confirmUser)
}

function* addNewUser(action) {
    try {
        let payload = action.payload;
        let res = yield call(api.user.userSubmit, payload);
        yield put(loginSuccess(res.data));
        let user = jwt(res.data.token);
        yield put(dispatchCurrentUser(user));
        localStorage.setItem('token', res.data.token);
        yield put(userSignUpScuccess(res.data));
    } catch (e) {
        yield put(userSignUpFailed(e.response));
    }
}

function* checkUserExists(action) {
    try {
        let payload = action.payload;
        let res = yield call(api.user.userExists, payload);
        yield put(successUserExists(res.data));
    } catch (e) {
        yield put(errorUserExists(e.response))
    }
}

function* confirmUser(action) {
    try {
        let payload = action.payload;
        let res = yield call(api.user.confirmUser, payload);
        yield put(confirmUserSuccess(res.data));
    } catch (e) {
        yield put(confirmUserFailed(e.response));
    }
}
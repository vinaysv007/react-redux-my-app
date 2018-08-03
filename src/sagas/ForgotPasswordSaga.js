import * as types from '../actions/Types';
import { call, put, takeLatest } from 'redux-saga/effects';
import { forgotPasswordError, forgotPasswordSuccess, validateTokenError, validateTokenSuccess, resetPasswordError, resetPasswordSuccess } from "../actions/Auth";
import api from '../api/Api';

export function* forgotPasswordWatcher() {
    yield takeLatest(types.FORGOT_PASSWORD_REQUEST, forgotPassword);
    yield takeLatest(types.VALIDATE_TOKEN_REQUEST, validateToken);
    yield takeLatest(types.RESET_PASSWORD_REQUEST, resetPassword);
}

function* forgotPassword(action) {
    try {
        let data = action.payload;
        let res = yield call(api.user.recoverPasswordRequest, data);
        yield put(forgotPasswordSuccess(res.data));
    } catch (e) {
        yield put(forgotPasswordError(e.response));
    }
}

function* validateToken(action) {
    try {
        let data = action.payload;
        let res = yield call(api.user.validateTokenRequest, data);
        yield put(validateTokenSuccess(res.data));
    } catch (e) {
        yield put(validateTokenError(e.response));
    }
}

function* resetPassword(action) {
    try {
        let data = action.payload;
        let res = yield call(api.user.resetPasswordRequest, data);
        yield put(resetPasswordSuccess(res.data));
    } catch (e) {
        yield put(resetPasswordError(e.response))
    }
}
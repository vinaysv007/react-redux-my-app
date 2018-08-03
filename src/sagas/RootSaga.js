import { loginWatcher } from './LoginSaga';
import { signupWatcher } from './SignupSaga';
import { logoutWatcher } from './LogoutSaga';
import { forgotPasswordWatcher } from './ForgotPasswordSaga';
import { chatSagaWatcher } from './ChatSaga';
import { all, fork } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        fork(loginWatcher),
        fork(logoutWatcher),
        fork(signupWatcher),
        fork(forgotPasswordWatcher),
        fork(chatSagaWatcher)
    ])
}
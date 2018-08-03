import { takeLatest, call, fork, take, put, cancelled, cancel } from 'redux-saga/effects';
import * as types from '../actions/Types';
import { setUpSocket, sendMessage } from '../socket';

export function* chatSagaWatcher() {
    yield takeLatest(types.INIT_SOCKET_CONNECTION, initSocket);
}

function* initSocket(action) {
    const chan = yield call(setUpSocket, action.username);
    const t1 = yield fork(closeSocketConnection, chan);
    const t2 = yield fork(addMessageListener);
    try {
        while (true) {
            let messageAction = yield take(chan);
            yield put(messageAction);
            if (messageAction === types.DISCONNECT_SOCKET_CONNECTION) {
                yield cancel(t2);
                yield cancel(t1);
            }
        }
    } catch (e) {
        chan.close();
    } finally {
        console.log('fork task closed...')
        if (yield cancelled()) {
            console.log('message stream terminated');
            chan.close();
        }
    }
}

function* addMessageListener() {
    while (true) {
        let action = yield take(types.ADD_MESSAGE);
        action.user = action.currentUser;
        yield call(sendMessage, action);
    }
}

function* closeSocketConnection(chan) {
    let action = yield take(types.DISCONNECT_SOCKET_CONNECTION);
    yield call(sendMessage, action);
    chan.close();
}
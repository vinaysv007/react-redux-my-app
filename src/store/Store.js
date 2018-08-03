import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
/* import thunk from 'redux-thunk'; */
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
/* import { setAuthToken } from '../utils'; */
import jwt_decode from 'jwt-decode';
import { dispatchCurrentUser } from '../actions/Auth';
import rootSaga from '../sagas/RootSaga';

const initState = {};
const saga = createSagaMiddleware();
const middleware = applyMiddleware(saga, logger);

const store = createStore(
    rootReducer,
    initState,
    compose(
        middleware,
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

saga.run(rootSaga);

if (localStorage.token) {
    //setAuthToken(localStorage.token);
    try {
        store.dispatch(dispatchCurrentUser(jwt_decode(localStorage.getItem('token'))));
    } catch (e) {
        console.log(e)
    }
}

export default store;
import * as types from '../actions/Types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
    response: null,
    error: null,
    isAuthenticated: false,
    user: null
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return { ...state, response: action.payload, error: null, user: action.payload, isAuthenticated: true }

        case types.LOGIN_FAILED:
            return { ...state, error: action.payload, response: null, user: null, isAuthenticated: false }

        case types.SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                error: null
            }
        case types.LOGOUT:
            return { ...state, error: null, response: null, user: null, isAuthenticated: false }
        default:
            return state
    }
}
export default loginReducer;
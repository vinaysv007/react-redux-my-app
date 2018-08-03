import * as types from '../actions/Types';

const initialState = {
    response: null,
    errors: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.RESET_PASSWORD_SUCCESS:
            return { ...state, response: action.payload, errors: null }
        case types.RESET_PASSWORD_ERROR:
            return { ...state, response: null, errors: action.payload }
        default:
            return state
    }
}

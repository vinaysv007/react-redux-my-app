import * as types from '../actions/Types';

const initialState = {
    response: null,
    errors: null,
    tokenValid: null,
    tokenError: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.FORGOT_PASSWORD_SUCCESS:
            return { ...state, response: action.payload, errors: null, tokenValid: null, tokenError: null }

        case types.FORGOT_PASSWORD_ERROR:
            return { ...state, response: null, errors: action.payload, tokenValid: null, tokenError: null }

        case types.VALIDATE_TOKEN_SUCCESS:
            return { ...state, response: null, errors: null, tokenValid: action.payload, tokenError: null }

        case types.VALIDATE_TOKEN_ERROR:
            return { ...state, response: null, errors: null, tokenValid: null, tokenError: action.payload }

        default:
            return state
    }
}

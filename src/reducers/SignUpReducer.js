import * as types from '../actions/Types';
const initialState = {
    responseData: null,
    errorData: null,
    existData: null,
    existError: null,
    confirmData: null,
    confirmError: null
}

const signUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SUCCESS_USER_REQUEST:
            state = { ...state, responseData: action.payload, errorData: null, existData: null, existError: null, confirmData: null, confirmError: null }
            break;
        case types.ERROR_USER_REQUEST:
            state = { ...state, errorData: action.payload, responseData: null, existData: null, existError: null, confirmData: null, confirmError: null }
            break;
        case types.USER_EXISTS_REQUEST:
            state = { ...state, existData: action.payload, existError: null, responseData: null, errorData: null, confirmData: null, confirmError: null }
            break;
        case types.ERROR_USER_EXISTS_REQUEST:
            state = { ...state, existError: action.payload, existData: null, responseData: null, errorData: null, confirmData: null, confirmError: null }
            break;
        case types.USER_CONFIRM_SUCCESS:
            state = { ...state, existError: action.payload, existData: null, responseData: null, errorData: null, confirmData: action.payload, confirmError: null }
            break;
            case types.USER_CONFIRM_FAILED:
            state = { ...state, existError: action.payload, existData: null, responseData: null, errorData: null, confirmData: null, confirmError: action.payload }
            break;
        default:
            break
    }
    return state;
}

export default signUpReducer;

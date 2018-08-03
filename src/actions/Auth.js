import * as types from './Types';

export const loginRequest = (data) => {
    return {
        type: types.LOGIN_REQUEST,
        payload: data
    }
}

export const loginSuccess = (data) => {
    return {
        type: types.LOGIN_SUCCESS,
        payload: data
    }
}

export const loginFailed = (error) => {
    return {
        type: types.LOGIN_FAILED,
        payload: error
    }
}

export const dispatchCurrentUser = (user) => {
    return {
        type: types.SET_CURRENT_USER,
        payload: user
    }
}

export const logout = () => {
    return {
        type: types.LOGOUT,
        payload: null
    }
}

export const forgotPasswordRequest = (data) => {
    return {
        type: types.FORGOT_PASSWORD_REQUEST,
        payload: data
    }
}

export const forgotPasswordSuccess = (data) => {
    return {
        type: types.FORGOT_PASSWORD_SUCCESS,
        payload: data
    }
}

export const forgotPasswordError = (error) => {
    return {
        type: types.FORGOT_PASSWORD_ERROR,
        payload: error
    }
}

export const validateTokenRequest = (token) => {
    return {
        type: types.VALIDATE_TOKEN_REQUEST,
        payload: token
    }
}

export const validateTokenSuccess = (data) => {
    return {
        type: types.VALIDATE_TOKEN_SUCCESS,
        payload: data
    }
}

export const validateTokenError = (error) => {
    return {
        type: types.VALIDATE_TOKEN_ERROR,
        payload: error
    }
}

export const resetPasswordRequest = (data) => {
    return {
        type: types.RESET_PASSWORD_REQUEST,
        payload: data
    }
}

export const resetPasswordSuccess = (data) => {
    return {
        type: types.RESET_PASSWORD_SUCCESS,
        payload: data
    }
}

export const resetPasswordError = (error) => {
    return {
        type: types.RESET_PASSWORD_ERROR,
        payload: error
    }
}

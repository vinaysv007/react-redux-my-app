import * as types from './Types';

export const userSignUpRequest = (data) => {
    return {
        type: types.ADD_USER_REQUEST,
        payload: data
    }
}

export const userSignUpScuccess = (data) => {
    return {
        type: types.SUCCESS_USER_REQUEST,
        payload: data
    }
}

export const userSignUpFailed = (error) => {
    return {
        type: types.ERROR_USER_REQUEST,
        payload: error
    }
}

export const checkUserExists = (identifier) => {
    return {
        type: types.INVOKE_USER_EXISTS_REQUEST,
        payload: identifier
    }
}

export const successUserExists = (data) => {
    return {
        type: types.USER_EXISTS_REQUEST,
        payload: data
    }
}

export const errorUserExists = (error) => {
    return {
        type: types.ERROR_USER_EXISTS_REQUEST,
        payload: error
    }
}

export const confirmUserSignUp = (token) => {
    return {
        type: types.USER_CONFIRM_REQUEST,
        payload: token
    }
}

export const confirmUserSuccess = (data) => {
    return {
        type: types.USER_CONFIRM_SUCCESS,
        payload: data
    }
}

export const confirmUserFailed = (error) => {
    return {
        type: types.USER_CONFIRM_FAILED,
        payload: error
    }
}
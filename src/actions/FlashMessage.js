import * as types from './Types';

export const addFlashMessage = (message) => {
    return {
        type: types.ADD_FLASH_MESSAGE,
        payload: message
    }
};

export const deleteFlashMessage = (id) => {
    return {
        type: types.DELETE_FLASH_MESSAGE,
        payload: id
    }
};

export const deleteAllFlashMessages = () => {
    return {
        type: types.DELETE_ALL_FLASH_MESSAGES,
        payload: ''
    }
}

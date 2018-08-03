import * as types from './Types';

let userCount = 0;
let messageCount = 0;

export const initSocketConnection = (username) => {
    return {
        type: types.INIT_SOCKET_CONNECTION,
        username
    }
}

export const endSocketConnection = () => {
    return {
        type: types.DISCONNECT_SOCKET_CONNECTION
    }
}

export const addUser = (name) => {
    return {
        type: types.ADD_USER,
        id: userCount++,
        name
    }
}

export const updateUsersList = (users) => {
    return {
        type: types.UPDATE_USERS_LIST,
        users
    }
}

export const addMessage = (message, user, currentUser) => {
    return {
        type: types.ADD_MESSAGE,
        id: messageCount++,
        message,
        user,
        currentUser
    }
}

export const messageReceived = (message, user) => {
    return {
        type: types.MESSAGE_RECEIVED,
        id: messageCount++,
        message,
        user
    }
}
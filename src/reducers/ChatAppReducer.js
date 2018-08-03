import * as types from '../actions/Types';

const userState = [{
    name: '',
    id: ''
}]

const messageState = [{
    name: '',
    message: '',
    id: ''
}]

export const users = (state = userState, action) => {
    switch (action.type) {
        case types.ADD_USER:
            return [...state, { name: action.name, id: action.id }]
        case types.UPDATE_USERS_LIST:
            return action.users;
        case types.DISCONNECT_SOCKET_CONNECTION:
            return [...state, userState]
        default:
            return state;
    }
}

export const message = (state = messageState, action) => {
    switch (action.type) {
        case types.MESSAGE_RECEIVED:
        case types.ADD_MESSAGE:
            return [...state, { name: action.user, message: action.message, id: action.id }];
        case types.DISCONNECT_SOCKET_CONNECTION:
            return [...state, messageState]
        default:
            return state;
    }
};


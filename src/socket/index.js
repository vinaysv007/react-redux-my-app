import * as types from '../actions/Types';
import { eventChannel } from 'redux-saga';
import { addUser, updateUsersList, messageReceived } from '../actions/Chat';

let socket;
export const setUpSocket = (username) => {
    return eventChannel(emitter => {
        socket = new WebSocket('ws://10.2.168.57:8080');

        socket.onopen = () => {
            console.log('socket connected successfully...')
            socket.send(JSON.stringify({
                type: types.ADD_USER,
                name: username
            }));
        }

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            switch (data.type) {
                case types.ADD_MESSAGE:
                    return emitter(messageReceived(data.message, data.user));
                case types.ADD_USER:
                    return emitter(addUser(data.name))
                case types.UPDATE_USERS_LIST:
                    return emitter(updateUsersList(data.users));
                default:
                    break;
            }
        }

        socket.onclose = () => {
            console.log('socket is disconnected');
        }

        socket.onerror = (event) => {
            console.log('socket error..', event);
        }

        return () => {
            socket = null;
            console.log('Socket off');
        }
    });
}

export const sendMessage = (action) => {
    socket.send(JSON.stringify(action));
}
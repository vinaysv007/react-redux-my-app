import * as types from '../actions/Types';
import shortid from 'shortid';
import findIndex from 'lodash/findIndex';

const initialState = [
    {
        id: "",
        type: "",
        message: "",
    }
]

const flashMessageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_FLASH_MESSAGE:
            return [
                ...state,
                {
                    id: shortid.generate(),
                    type: action.payload.type,
                    message: action.payload.message
                }
            ];
        case types.DELETE_FLASH_MESSAGE:
            const index = findIndex(state, { id: action.payload });
            if (index >= 0) {
                return [
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ]
            }
            return state;
        case types.DELETE_ALL_FLASH_MESSAGES: {
            state = initialState;
            return state
        }
        default:
            return state;
    }
}
export default flashMessageReducer;
import * as types from '../actions/action-types'
import {socket} from '../utils/socket/socket'

const initialState = {
    handle: '',
    handle_set: false,
    message_field: '',
    displayed_messages: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.MESSAGE_FIELD_UPDATE:
            return Object.assign({}, state, {message_field: action.message});

        case types.ADD_MESSAGE:
            const newMessages = [].concat(state.displayed_messages);
            newMessages.push(action.message);
            return Object.assign({}, state, {displayed_messages: newMessages});

        case types.SEND_MESSAGE:
            let msg = {
                message: state.message_field,
                handle: state.handle,
                socketid: sessionStorage.getItem('socketid')
            };

            socket.send(JSON.stringify(msg));
            return Object.assign({}, state, {message_field: ''});

        case types.SET_HANDLE:
            return Object.assign({}, state, {handle_set: true});

        case types.HANDLE_UPDATE:
            return Object.assign({}, state, {handle: action.handle});

        default:
            return state
    }
};

import * as types from '../actions/action-types'
import {socket} from '../socket'

const initialState = {
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
                type: "message",
                text: state.message_field
            };
            socket.send(JSON.stringify(msg));
            return Object.assign({}, state, {message_field: ''});

        default:
            return state
    }
};

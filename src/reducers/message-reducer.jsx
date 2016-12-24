import * as types from '../actions/action-types'

const initialState = {
    message_field: '',
    displayed_messages: []
};

const messageReducer = function (state = initialState, action) {
    "use strict";
    switch (action.type) {
        case types.MESSAGE_FIELD_UPDATE:
            return {...state, message_field: action.message};

        case types.ADD_MESSAGE:
            const newMessages = [].concat(state.displayed_messages);
            newMessages.push(action.message);
            return Object.assign({}, state, {displayed_messages: newMessages})

        default:
            return state
    }
};
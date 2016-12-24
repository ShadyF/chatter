import * as types from './action-types'

export function messageFieldUpdate(message) {
    "use strict";
    return {
        type: types.MESSAGE_FIELD_UPDATE,
        message
    }
}

export function addMessage(message) {
    "use strict";
    return {
        type: types.ADD_MESSAGE,
        message
    }
}
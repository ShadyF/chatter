import * as types from './action-types'

export function setHandle() {
    "use strict";
    return {
        type: types.SET_HANDLE,
    }
}
export function handleUpdate(handle){
    "use strict";
    return {
        type : types.HANDLE_UPDATE,
        handle
    }
}
export function addMessage(message) {
    "use strict";
    return {
        type: types.ADD_MESSAGE,
        message
    }
}

export function sendMessage() {
    "use strict";
    return {
        type: types.SEND_MESSAGE
    }
}

export function messageFieldUpdate(message) {
    "use strict";
    return {
        type: types.MESSAGE_FIELD_UPDATE,
        message
    }
}

export function connectionEstablished(){
    "use strict";
    return {
        type: types.CONNECTION_ESTABLISHED
    }
}

export function connectionError() {
    "use strict";
    return {
        type: types.CONNECTION_ERROR
    }
}


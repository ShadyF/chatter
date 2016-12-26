import * as messageActions from 'actions/message-actions'
import io from 'socket.io-client'

const host = 'localhost';
const port = 8000;

let socket = null;

function initListener(store) {
    "use strict";
    socket = io.connect(host + ':' + port);

    socket.on('message', message => {
        store.dispatch(messageActions.addMessage(message));
    })
}

export {initListener, socket}

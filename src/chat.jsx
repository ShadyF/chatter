import * as messageActions from 'actions/message-actions'
import io from 'socket.io-client'

const host = 'localhost';
const port = 8000;

export function initListener(store) {
    "use strict";
    const socket = io.connect(host + ':' + port);

    socket.on('message', message => {
        store.dispatch(messageActions.addMessage(message));
    })
}
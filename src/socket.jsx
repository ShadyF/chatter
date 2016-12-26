import * as messageActions from './actions/message-actions'

const host = 'localhost';
const port = 8000;

let socket = null;

function initListener(store) {
    "use strict";
    socket = new WebSocket(host + port + '/chat');

    socket.onmessage = message => {
        store.dispatch(messageActions.addMessage(message.text));
    };
}

export {initListener, socket}

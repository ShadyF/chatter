import * as messageActions from './actions/message-actions'
import ReconnectingWebsocket from './reconnecting-websocket'
const host = 'localhost';
const port = 8000;

let socket = null;

function initListener(store) {
    "use strict";
    socket = new ReconnectingWebsocket('ws://' + host + ':' + port + '/chat');

    socket.onmessage = message => {
        store.dispatch(messageActions.addMessage(message.text));
    };
}

export {initListener, socket}

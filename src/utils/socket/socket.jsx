import * as messageActions from '../../actions/chat-actions'
import ReconnectingWebsocket from './reconnecting-websocket'
const host = 'localhost';
const port = 8000;

let socket = null;

function initListener(store) {
    "use strict";
    socket = new ReconnectingWebsocket('ws://' + host + ':' + port + '/chat');

    socket.onmessage = message => {
        // Parse message type here
        store.dispatch(messageActions.addMessage(JSON.parse(message.data)));
    };
}

export {initListener, socket}

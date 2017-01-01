import * as messageActions from '../../actions/chat-actions'
import ReconnectingWebsocket from './reconnecting-websocket'

const host = 'localhost';
const port = 8000;

let socket = null;

function initListener(store) {
    "use strict";
    socket = new ReconnectingWebsocket('ws://' + host + ':' + port + '/chat');

    socket.onopen = () => {
        store.dispatch(messageActions.connectionEstablished())
    };

    socket.onmessage = message => {
        let messageObject = JSON.parse(message.data);

        switch (messageObject.type) {
            case 'id':
                sessionStorage.setItem('socketid', messageObject.socketid);
                break;
            case 'message':
                const ownSocketid = sessionStorage.getItem('socketid');
                const messageSocketid = messageObject.socketid;

                Object.assign(messageObject, {ownMessage: ownSocketid === messageSocketid});
                store.dispatch(messageActions.addMessage(messageObject));
                break;
            default:
                break;
        }
    };

    socket.onerror = () => {
        store.dispatch(messageActions.connectionError());
    }
}

export {initListener, socket}

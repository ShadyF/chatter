import * as types from 'actions/action-types'
import io from 'socket.io-client'

const host = 'localhost';
const port = 8000;

export function initListener(store) {
    "use strict";
    const socket = io.connect(host + ':' + port);
}
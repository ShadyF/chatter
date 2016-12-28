import {combineReducers}from 'redux'

import chatReducer from './chat-reducer'

const reducers = combineReducers({
    chatState: chatReducer
});

export default reducers
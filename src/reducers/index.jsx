import {combineReducers}from 'redux'

import messageReducer from './message-reducer'
import nameReducer from './name-reduces.jsx'

const reducers = combineReducers({
    display_name: nameReducer,
    messages: messageReducer
});
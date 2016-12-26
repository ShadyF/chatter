import {combineReducers}from 'redux'

import messageReducer from './message-reducer'
import nameReducer from './name-reducer.js'

const reducers = combineReducers({
    display_name: nameReducer,
    messages: messageReducer
});

export default reducers
import {createStore} from 'redux'
import reducers from './reducers'
import {initListener} from './utils/socket/socket'

// const store = createStore(reducers);

let store = null;
// For redux-devtools chrome extension
if (__DEVTOOLS__)
    store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
else
    store = createStore(reducers);

// Initialize socket listener and attach our store to it
initListener(store);

export default store;
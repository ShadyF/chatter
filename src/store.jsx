import {createStore} from 'redux'
import reducers from './reducers'
import {initListener} from './utils/socket/socket'

// const store = createStore(reducers);

// For redux-devtools chrome extension
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Initialize socket listener and attach our store to it
initListener(store);

export default store;
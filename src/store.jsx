import {createStore} from 'redux'
import reducers from './reducers'
import {initListener} from './socket'

const store = createStore(reducers);

// Initialize socket listener and attach our store to it
initListener(store);

export default store;
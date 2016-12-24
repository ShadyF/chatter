import { createStore } from 'redux'
import reducers from './reducers'
import { initListener } from './chat'

const store = createStore(reducers);

// Initialize socket listener and attach our store to it
initListener(store);

export default store;
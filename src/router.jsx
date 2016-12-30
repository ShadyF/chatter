import React from 'react'
import {Router, Route, browserHistory, IndexRoute}from 'react-router'

import {AppContainer, ChatBoxContainer} from './components'

export default (
    <Router history={browserHistory}>
        <Route path="/" component={AppContainer}>
            <IndexRoute component={ChatBoxContainer}/>
        </Route>
    </Router>
)
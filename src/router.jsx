import React from 'react'
import {Router, Route, browserHistory, hashHistory, IndexRoute}from 'react-router'

import {AppContainer, ChatBoxContainer} from './components'

export default (
    <Router history={hashHistory}>
        <Route path="/" component={AppContainer}>
            <IndexRoute component={ChatBoxContainer}/>
        </Route>
    </Router>
)
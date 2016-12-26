import React from 'react'
import {Router, Route, browserHistory, IndexRoute}from 'react-router'

import MainLayout from './components/layouts/main-layout/main-layout'
import ChatBoxContainer from './components/containers/chat-box-container'

export default (
    <Router history={browserHistory}>
        <Route component={MainLayout}>
            <Route path="/" component={ChatBoxContainer}/>
        </Route>
    </Router>
)
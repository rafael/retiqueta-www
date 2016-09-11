import React from 'react'
import { App, Landing } from './components'
import { PasswordUpdate } from './containers'
import { Router, Route, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import store from './store'
import hashHistory from './hashHistory'

const history = syncHistoryWithStore(hashHistory, store)

const router = (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Landing} />
      <Route path="update-password/:token" component={PasswordUpdate} />
      <Route path="update-password-complete" component={PasswordUpdate} />
    </Route>
  </Router>
)

export default router

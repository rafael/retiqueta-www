import React from 'react'
import { App, Landing } from './components'
import { PasswordReset } from './containers'
import { Router, Route, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import store from './store'
import hashHistory from './hashHistory'

const history = syncHistoryWithStore(hashHistory, store)

const router = (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Landing} />
      <Route path="update-password/:token" component={PasswordReset} />
      <Route path="update-password-complete" component={PasswordReset} />
    </Route>
  </Router>
)

export default router

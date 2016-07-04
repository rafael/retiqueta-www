require('./favicon.png')

import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import appStore from './reducers'
import { App, Landing } from './components'
import { Router, Route, IndexRoute, useRouterHistory, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, push } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import { createHashHistory } from 'history'

let store = createStore(
  appStore,
  applyMiddleware(
    thunkMiddleware
  ))

// Url with hash
// const history = syncHistoryWithStore(
//   useRouterHistory(createHashHistory)({ queryKey: false }),
//   store)

const history = syncHistoryWithStore(browserHistory, store)

const root = document.getElementById('root')

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Landing} />
      </Route>
    </Router>
  </Provider>, root
)

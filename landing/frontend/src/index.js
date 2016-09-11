require('./favicon.png')

import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import router from './router'

const root = document.getElementById('root')

render(
  <Provider store={store}>
    {router}
  </Provider>, root
)

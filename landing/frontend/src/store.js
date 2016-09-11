import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './redux/modules/reducer'
import hashHistory from './hashHistory'
import { routerMiddleware } from 'react-router-redux';

const middleware = applyMiddleware(
  routerMiddleware(hashHistory),
  thunk
)

const store = createStore(reducer, middleware)

export default store

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import subscribeForm from './subscribeForm'

const appStore = combineReducers({
  subscribeForm,
  routing: routerReducer
})

export default appStore

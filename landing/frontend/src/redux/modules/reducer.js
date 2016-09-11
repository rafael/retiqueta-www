import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import passwords from './passwords'

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  passwords
})

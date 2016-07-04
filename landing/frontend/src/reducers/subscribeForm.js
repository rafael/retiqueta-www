import { type } from '../actions'

const initialState = { errorMessage: null, successMessage: null, loading: false }

const subscribeForm = (state = initialState, action) => {
  switch (action.type) {
    case type.REQUEST_SUBSCRIBE:
      return Object.assign({}, state, initialState, { loading: true })

    case type.REPLY_SUBSCRIBE:
      return Object.assign({}, state, { loading: false }, action.reply)

    default:
      return state
  }
}

export default subscribeForm

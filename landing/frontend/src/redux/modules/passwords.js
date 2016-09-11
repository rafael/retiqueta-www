import config from '../../config'
import { push } from 'react-router-redux'
import { LOCATION_CHANGE } from 'react-router-redux'

const UPDATE          = 'retiqueta/passwords/UPDATE'
const UPDATE_SUCCESS  = 'retiqueta/passwords/UPDATE_SUCCESS'
const UPDATE_FAIL     = 'retiqueta/passwords/UPDATE_FAIL'
const RESET           = 'retiqueta/passwords/RESET'
const RESET_SUCCESS   = 'retiqueta/passwords/RESET_SUCCESS'
const RESET_FAIL      = 'retiqueta/passwords/RESET_FAIL'

const PASSWORD_MIN_LENGTH = 8
const UNEXPECTED_ERROR_MESSAGE = 'Ha ocurrido un error, intenta de nuevo luego'
const UPDATE_SUCCESS_MESSAGE = 'Tu contraseña ha sido modificada satisfactoriamente'
const endpoints = config.api.endpoints

export const UPDATE_COMPLETE_PATH = '/update-password-complete'

const initialState = {
  updating: false,
  reseting: false,
  updateMessage: null,
  updateComplete: false,
  resetMessage: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE:
      return { ...state, updating: true }

    case UPDATE_FAIL:
      return {
        ...state,
        updateMessage: action.error,
        updateComplete: true
      }

    case UPDATE_SUCCESS:
      return {
        ...state,
        updateMessage: UPDATE_SUCCESS_MESSAGE,
        updateComplete: true
      }

    case LOCATION_CHANGE:
      if (action.payload.pathname == UPDATE_COMPLETE_PATH) {
        return {
          ...initialState,
          updateComplete: state.updateMessage,
          updateMessage: state.updateMessage
        }
      } else {
        return { ...initialState }
      }

    default: return state
  }
}

//------------------------------------------------------------------------------
// Actions
//------------------------------------------------------------------------------

function goHome() {
  return push('/')
}

function updateComplete(dispatch, action) {
  dispatch(action)
  dispatch(push(UPDATE_COMPLETE_PATH))
}

function updateSuccess() {
  return { type: UPDATE_SUCCESS }
}

function updateFail(error) {
  return { type: UPDATE_FAIL, error }
}

function update(password, token) {
  return (dispatch) => {
    dispatch({ type: UPDATE })

    return fetch(endpoints.resetPassword, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: { type: 'users', attributes: { password, token } }
      })

    }).then(response => {
      if (response.status === 200) {
        dispatch(updateSuccess())
      } else {
        response.json().then(json => updateComplete(dispatch, updateFail(json.detail)))
      }

    }).catch(response => {
      updateComplete(dispatch, updateFail(UNEXPECTED_ERROR_MESSAGE))
    })
  }
}

export const actionCreators = {
  update,
  goHome
}


//------------------------------------------------------------------------------
// Validators
//------------------------------------------------------------------------------

export const validators = {

  passwordResetForm: values => {
    const errors = {}

    if (!values.password || values.password.length < PASSWORD_MIN_LENGTH) {
      errors.password = `Mínimo ${PASSWORD_MIN_LENGTH} caracteres`
    }

    if (values.password && !values.passwordConfirmation) {
      errors.passwordConfirmation = "Campo requerido"
    } else if (values.passwordConfirmation != values.password) {
      errors.passwordConfirmation = "La confirmación de la contraseña no coincide"
    }

    return errors
  }
}

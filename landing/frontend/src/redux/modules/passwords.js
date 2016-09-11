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
const RESET_SUCCESS_MESSAGE = 'Te hemos enviado un correo electrónico con instrucciones para que puedas cambiar tu contraseña'
const endpoints = config.api.endpoints

export const UPDATE_COMPLETE_PATH = '/update-password-complete'
export const RESET_COMPLETE_PATH = '/reset-password-complete'

const initialState = {
  updating: false,
  reseting: false,
  updateMessage: '',
  updateComplete: false,
  resetMessage: '',
  resetComplete: false
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

    case RESET:
      return { ...state, reseting: true, resetMessage: '' }

    case RESET_FAIL:
      return {
        ...state,
        reseting: false,
        resetMessage: action.error,
        resetComplete: false
      }

    case RESET_SUCCESS:
      return {
        ...state,
        resetMessage: RESET_SUCCESS_MESSAGE,
        resetComplete: true
      }

    case LOCATION_CHANGE:
      if (action.payload.pathname == UPDATE_COMPLETE_PATH || action.payload.pathname == RESET_COMPLETE_PATH) {
        return {
          ...initialState,
          updateComplete: state.updateComplete,
          updateMessage: state.updateMessage,
          resetComplete: state.resetComplete,
          resetMessage: state.resetMessage
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

function completeTask(dispatch, action, completePath) {
  dispatch(action)

  if (completePath !== false) {
    dispatch(push(completePath))
  }
}

function updateSuccess() {
  return { type: UPDATE_SUCCESS }
}

function updateFail(error) {
  return { type: UPDATE_FAIL, error }
}

function postRequestHandler(actionType, endpoint, attributes, successHandler, failureHandler, completePath, completeOnFailure) {
  return (dispatch) => {
    dispatch({ type: actionType })

    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: { type: 'users', attributes }
      })

    }).then(response => {
      if (response.status === 204) {
        completeTask(dispatch, successHandler(), completePath)
      } else {
        response.json().then(json => completeTask(dispatch, failureHandler(json.detail), completeOnFailure && completePath))
      }

    }).catch(response => {
      completeTask(dispatch, failureHandler(UNEXPECTED_ERROR_MESSAGE), completeOnFailure && completePath)
    })
  }
}

function update(password, token) {
  return postRequestHandler(
    UPDATE,
    endpoints.updatePassword,
    { password, token },
    updateSuccess,
    updateFail,
    UPDATE_COMPLETE_PATH,
    true
  )
}

function resetSuccess() {
  return { type: RESET_SUCCESS }
}

function resetFail(error) {
  return { type: RESET_FAIL, error }
}

function reset(email) {
  return postRequestHandler(
    RESET,
    endpoints.resetPassword,
    { email },
    resetSuccess,
    resetFail,
    RESET_COMPLETE_PATH,
    false
  )
}

export const actionCreators = {
  update,
  reset,
  goHome
}


//------------------------------------------------------------------------------
// Validators
//------------------------------------------------------------------------------

export const validators = {

  updateForm: values => {
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
  },

  resetForm: values => {
    const errors = {}

    if (!values.email) {
      errors.email = 'Este campo es requerido'
    }

    return errors
  }
}

import fetch from 'isomorphic-fetch'
import config from '../config'
import keyMirror from 'fbjs/lib/keyMirror'

export const type = keyMirror({
  REQUEST_SUBSCRIBE: null,
  REPLY_SUBSCRIBE: null
})

const SUCCESS_MESSAGE = 'Gracias!'
const INVALID_EMAIL_MESSAGE = 'La dirección de correo no es válida.'
const EMPTY_EMAIL_MESSAGE = 'Debes suministrar tu dirección de correo.'
const SERVER_ERROR_MESSAGE = 'Hubo un error procesando la solicitud.'

export const requestSubscribe = () => {
  return { type: type.REQUEST_SUBSCRIBE }
}

function replySubscribe(reply) {
  return { type: type.REPLY_SUBSCRIBE, reply: reply, receivedAt: Date.now() }
}

export const subscribe = (rawEmail) => {
  const email = rawEmail.replace(/^\s+|\s+$/gm,'').toLowerCase()

  if(email === '') {
    return replySubscribe({ errorMessage: EMPTY_EMAIL_MESSAGE })
  }

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if(!re.test(email)) {
    return replySubscribe({ errorMessage: INVALID_EMAIL_MESSAGE })
  }

  return (dispatch) => {
    dispatch(requestSubscribe())
      return fetch(config.subscribeUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email_address: email })
      })
      .then(response => {
        if (response.status === 200) {
          dispatch(replySubscribe({ successMessage: SUCCESS_MESSAGE }))
        } else {
          dispatch(replySubscribe({ errorMessage: INVALID_EMAIL_MESSAGE }))
        }
      })
      .catch(response => {
        if (response instanceof Error) {
          dispatch(replySubscribe({ errorMessage: SERVER_ERROR_MESSAGE }))
        } else {
          dispatch(replySubscribe({ errorMessage: INVALID_EMAIL_MESSAGE }))
        }
      })
  }
}

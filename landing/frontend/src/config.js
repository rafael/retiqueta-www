const apiUrl = process.env.API_URL || 'https://api.retiqueta.com'

function endpoint(path) {
  return apiUrl + path
}

export default {
  subscribeUrl: process.env.SUBSCRIBE_URL || 'https://7209i4g95c.execute-api.us-east-1.amazonaws.com/v1',

  api: {
    url: apiUrl,
    endpoints: {
      updatePassword: endpoint('/v1/reset_password'),
      resetPassword: endpoint('/v1/send_password_reset')
    }
  }
}

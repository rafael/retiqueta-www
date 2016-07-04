const subscribeUrl = () => {
  return process.env.SUBSCRIBE_URL || 'https://7209i4g95c.execute-api.us-east-1.amazonaws.com/v1'
}

export default {
  subscribeUrl: subscribeUrl()
}

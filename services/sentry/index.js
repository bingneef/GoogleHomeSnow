const Raven = require('raven')
const constants = require('./../../config/constants')

const guard = process.env.NODE_ENV !== 'production'

const initSentry = () => {
  if (guard) {
    console.log('Sentry not started.')
    return
  }

  Raven.config(constants.tokens.sentry).install()
}

const sendException = e => {
  if (guard) {
    console.log('Exception not send: ', e.message)
    return
  }

  Raven.captureException(e)
}

module.exports = {
  initSentry,
  sendException,
}

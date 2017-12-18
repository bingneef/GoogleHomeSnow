import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path: path.join(__dirname, "../.env")})

const serverPort = process.env.PORT || 4000
module.exports = {
  version: '0.0.1',
  serverPort,
  tokens: {
    sentry: process.env.SENTRY_KEY,
    weatherUnlocked: {
      appId: process.env.WEATHER_UNLOCKED_APP_ID,
      appKey: process.env.WEATHER_UNLOCKED_APP_KEY,
    }
  },
  googleHome: {
    actions: {
      ACTION_SNOW_REPORT: 'snow_report',
    },
    arguments: {
      ARGUMENT_SNOW_RESORT: 'snow_resort',
    }
  }
}

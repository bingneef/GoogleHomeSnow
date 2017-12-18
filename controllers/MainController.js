import { sendException } from './../services/sentry'
import { googleHome } from './../config/constants'
import { createReportSentence } from './../helpers/linguistics'
import { tokens } from './../config/constants'

import axios from 'axios'

export const index = async app => {
  const url = 'http://api.weatherunlocked.com/api/snowreport/333020'
  const { weatherUnlocked: { appId, appKey } } = tokens

  const { data } = await axios.get(url, {
    params: {
      app_id: appId,
      app_key: appKey,
    },
  })

  const response = createReportSentence(data)

  try {
    if (app.body_.originalRequest.source == 'slack') {
      const slack_message = { 'text': response }
      const payload = {
        speech: response,
        displayText: response,
        data: {slack: {text: response}},
        contextOut: [],
        source: 'daily-snow-report'
      }
      return app.response_.send(payload)
    }
  } catch (_) { }

  return app.tell(response)
}

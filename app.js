'use strict'

import morgan from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'
import { DialogflowApp } from 'actions-on-google'

import { initSentry, sendException } from './services/sentry'
import { version, googleHome, serverPort } from './config/constants'
import {
  index,
} from './controllers/MainController'

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(async (req, res) => {
  const {
  ACTION_SNOW_REPORT,
  } = googleHome.actions

  const assistant = new DialogflowApp({
    request: req,
    response: res,
  })

  try {
    let actionMap = new Map()
  actionMap.set(ACTION_SNOW_REPORT, index)

    await assistant.handleRequest(actionMap)
    return null
  } catch (e) {
    sendException(e)
    console.log(e)
    return assistant.tell(`Something very bad happened!`)
  }
})

if (!module.parent) {
  app.listen(serverPort)
  initSentry()

  console.log(`Server is now running on port ${serverPort}`)
  console.log(`Version: ${version}`)
  console.log(`Environment: ${(process.env.NODE_ENV || 'dev')}`)
}


'use strict'

require('rootpath')()
const express = require('express')
const app = express()
const config = require('./config/index')
const routes = require('./routes')
const prepare_response = require('./lib/hooks/prepare_response')

// [GET] home
app
  .get(
    '/',
    routes.home.config,
    routes.home.controller,
    prepare_response)
// [GET] tasks
app
  .get(
    '/tasks',
    routes.task.config,
    routes.task.controller,
    prepare_response)

app
  .listen(config.port, () => {
    console.log(`Abraxas API running in ${config.domain}`)
  })

// '.- -- -.. --.'

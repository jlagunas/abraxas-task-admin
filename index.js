'use strict'

require('rootpath')()
const Sequelize = require('sequelize')
const express = require('express')
const app = express()
const config = require('./config/index')
const prepare_response = require('./lib/hooks/prepare_response')
const resources = require('./resources')

app.disable('x-powered-by')

global.__db = new Sequelize(config.db.name, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: 'mysql',
  port: config.db.port,
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

// [GET] home
app
  .get(
    '/',
    resources.home.config,
    resources.home.controller,
    prepare_response)

// [GET] tasks
app
  .get(
    '/tasks',
    resources.task.config,
    resources.task.controller.get,
    prepare_response)

// [POST] tasks
app
  .post(
    '/tasks',
    resources.task.config,
    resources.task.validator,
    resources.task.controller.create,
    prepare_response)

app
  .listen(config.port, () => {
    console.log(`Abraxas API running in ${config.domain}`)
  })

// '.- -- -.. --.'

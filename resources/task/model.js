'use strict'
const _ = require('lodash')
const Sequelize = require('sequelize')

function is_alphanumeric(field) {
  return ((/^([a-zA-Z0-9 ]+)$/).test(field))
}

function is_positive_numeric(field) {
  return (!_.isNaN(parseInt(field) && _.isFinite(field))) && field >= 0
}

const Task = (db) => {
  return db.define('tasks', {
    id: {
      type: Sequelize.INTEGER(11),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        is_alphanumeric: function(description) {
          if (!is_alphanumeric(description)) {
            throw new Error('El campo debe ser alfanúmerico')
          }
        }
      }
    },
    estimated_time: {
      type: Sequelize.INTEGER(11),
      defaultValue: 0,
      allowNull: false,
      validate: {
        is_positive_numeric: function(estimated_time) {
          if (!is_positive_numeric(estimated_time)) {
            throw new Error('El campo debe ser un número entero positivo')
          }
        }
      }
    },
    registered_time: {
      type: Sequelize.INTEGER(11),
      defaultValue: 0,
      allowNull: false,
      validate: {
        is_positive_numeric: function(registered_time) {
          if (!is_positive_numeric(registered_time)) {
            throw new Error('El campo debe ser un número entero positivo')
          }
        }
      }
    },
    status: {
      type: Sequelize.ENUM('pending', 'completed'),
      allowNull: true,
      defaultValue: 'pending'
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false
  })
}

module.exports = Task

// '.- -- -.. --.'

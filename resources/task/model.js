'use strict'
import { isNaN, isFinite } from 'lodash'
import { INTEGER, STRING, ENUM, DATE, NOW } from 'sequelize'

function is_alphanumeric(field) {
  return ((/^([a-zA-Z0-9 ]+)$/).test(field))
}

function is_positive_numeric(field) {
  return (!isNaN(parseInt(field) && isFinite(field))) && field >= 0
}

const Task = (db) => {
  return db.define('tasks', {
    id: {
      type: INTEGER(11),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: STRING,
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
      type: INTEGER(11),
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
      type: INTEGER(11),
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
      type: ENUM('pending', 'completed'),
      allowNull: true,
      defaultValue: 'pending'
    },
    created_at: {
      type: DATE,
      allowNull: false,
      defaultValue: NOW
    },
    updated_at: {
      type: DATE,
      allowNull: false,
      defaultValue: NOW
    }
  },
  {
    timestamps: false
  })
}

export default Task

// '.- -- -.. --.'

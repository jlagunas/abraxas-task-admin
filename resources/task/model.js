'use strict'
const Sequelize = require('sequelize')

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
    },
    estimated_time: {
      type: Sequelize.INTEGER(11),
      defaultValue: 0,
      allowNull: true
    },
    registered_time: {
      type: Sequelize.INTEGER(11),
      defaultValue: 0,
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM('pending', 'completed'),
      allowNull: true,
      defaultValue: 'pending'
    }
  })
}

module.exports = Task

// '.- -- -.. --.'

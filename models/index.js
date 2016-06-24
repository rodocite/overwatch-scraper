const Sequelize = require('sequelize')
const db = require('../db.config.js')

const Hero = require('./Hero')
const Map = require('./Map')
const Player = require('./Player')
const Stat = require('./Stat')
const User = require('./User')

module.exports = {
  Hero,
  Map,
  Player,
  Stat,
  User
}

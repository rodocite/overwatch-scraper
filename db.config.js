const Sequelize = require('sequelize');
const db = new Sequelize('overwatch_data', 'rodo', null, {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = db;

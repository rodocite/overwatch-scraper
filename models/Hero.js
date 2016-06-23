var Sequelize = require('sequelize');
var db = require('../db.config.js');

var Hero = db.define('heroes', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  }
},
{ timestamps: false });

// Create - Migration
Hero.sync().then(() => {
  Hero.describe().then(table => console.log('\n', table));
});

module.exports = Hero;

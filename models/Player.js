const Sequelize = require('sequelize')
const db = require('../db.config.js')

const Player = db.define('players', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: Sequelize.INTEGER
  },
  stat_id: {
    type: Sequelize.INTEGER
  },
  battletag: {
    type: Sequelize.STRING
  }
},
{ timestamps: true });

Player.sync().then(() => {
  Player.describe().then(table => console.log('\n', table));
});

module.exports = Player

const Sequelize = require('sequelize')
const db = require('../db.config.js')

const Stat = db.define('stats', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  player_id: {
    type: Sequelize.INTEGER
  },
  melee_final_blows: {
    type: Sequelize.INTEGER
  },
  solo_kills: {
    type: Sequelize.INTEGER
  },
  objective_kills: {
    type: Sequelize.INTEGER
  },
  final_blows: {
    type: Sequelize.INTEGER
  },
  damage_done: {
    type: Sequelize.INTEGER
  },
  eliminations: {
    type: Sequelize.INTEGER
  },
  environmental_kills: {
    type: Sequelize.INTEGER
  },
  multikills: {
    type: Sequelize.INTEGER
  }
},
{ timestamps: true });

Stat.sync().then(() => {
  Stat.describe().then(table => console.log('\n', table));
});

module.exports = Stat

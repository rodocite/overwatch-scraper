const Sequelize = require('sequelize')
const db = require('../db.config.js')

const User = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  player_id: {
    type: Sequelize.INTEGER
  }
},
{ timestamps: true });

User.sync().then(() => {
  User.describe().then(table => console.log('\n', table));
});

module.exports = User

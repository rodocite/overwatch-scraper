const Sequelize = require('sequelize')
const db = require('../db.config.js')

const Map = db.define('maps', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  }
},
{ timestamps: false });

Map.sync().then(() => {
  Map.describe().then(table => console.log('\n', table));
});

module.exports = Map;

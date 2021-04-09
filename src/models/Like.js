const Sequelize = require('sequelize');
const db = require('../db/sequelize');

const Like = db.define('Likes', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
  },
});

module.exports = Like;

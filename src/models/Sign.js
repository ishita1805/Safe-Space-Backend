const Sequelize = require('sequelize');
const db = require('../db/sequelize');

const Sign = db.define('Sign', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
  },
  sign: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Sign;

const Sequelize = require('sequelize');
const db = require('../db/sequelize');

const Notify = db.define('Notify', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
  },
  notification: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  read: {
    type: Sequelize.BOOLEAN,
    allownull: false,
    defaultValue: false,
  }
});

module.exports = Notify;

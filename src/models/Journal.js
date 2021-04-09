const Sequelize = require('sequelize');
const db = require('../db/sequelize');

const Journal = db.define('Journals', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING(1234),
    allowNull: false,
  },
  confession: {
    type: Sequelize.STRING(1234),
    allowNull: false,
  },
});

module.exports = Journal;

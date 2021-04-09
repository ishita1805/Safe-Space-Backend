const Sequelize = require('sequelize');
const db = require('../db/sequelize');

const Tag = db.define('Tags', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
  },
  tag: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Tag;

const Sequelize = require('sequelize');
const db = require('../db/sequelize');

const User = db.define('Users', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'user',
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  number: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  photo: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  pid: {
    type: Sequelize.STRING,
    allowNull: true,
  },
 
});

module.exports = User;

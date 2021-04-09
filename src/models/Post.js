const Sequelize = require('sequelize');
const db = require('../db/sequelize');

const Post = db.define('Posts', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
  },
  file: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type:{
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'post',
  },
  pid: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  caption: {
    type: Sequelize.STRING(1234),
    allowNull: false,
  },
});

module.exports = Post;

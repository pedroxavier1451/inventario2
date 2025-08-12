const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/inventario.db',
  logging: false,
});

module.exports = sequelize;
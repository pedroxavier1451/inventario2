const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Usuario = sequelize.define('Usuario', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'cliente'
  }
}, {
  tableName: 'users',
  timestamps: true
});

module.exports = Usuario;
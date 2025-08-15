const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Producto = sequelize.define('Producto', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: { min: 0 }
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
    validate: { min: 0 }
  }
}, {
  tableName: 'productos', // Cambié el nombre de la tabla
  timestamps: true
});

module.exports = Producto;
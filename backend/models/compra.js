const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Compra = sequelize.define('Compra', {
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 }
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: { min: 0 }
  }
}, {
  tableName: 'compras',
  timestamps: true
});

module.exports = Compra;

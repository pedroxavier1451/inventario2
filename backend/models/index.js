const Usuario = require('./usuario');
const Producto = require('./producto');
const Compra = require('./compra');
const DetalleCompra = require('./detalleCompra');

// Relaciones
Usuario.hasMany(Compra, { foreignKey: 'clienteId', as: 'compras' });
Compra.belongsTo(Usuario, { foreignKey: 'clienteId', as: 'cliente' });

Compra.hasMany(DetalleCompra, { foreignKey: 'compraId', as: 'detalles' });
DetalleCompra.belongsTo(Compra, { foreignKey: 'compraId', as: 'compra' });

Producto.hasMany(DetalleCompra, { foreignKey: 'productoId', as: 'detalles' });
DetalleCompra.belongsTo(Producto, { foreignKey: 'productoId', as: 'producto' });

module.exports = {
  Usuario,
  Producto,
  Compra,
  DetalleCompra
};
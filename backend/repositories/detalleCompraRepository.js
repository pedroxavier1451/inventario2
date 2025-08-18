const { DetalleCompra } = require('../models');

// Crear un detalle de compra
const createDetalleCompra = async (compraId, productoId, cantidad, precioUnitario, subtotal) => {
  return await DetalleCompra.create({ compraId, productoId, cantidad, precioUnitario, subtotal });
};

// Obtener detalles por compra
const getDetallesByCompra = async (compraId) => {
  return await DetalleCompra.findAll({ where: { compraId } });
};

module.exports = {
  createDetalleCompra,
  getDetallesByCompra
};
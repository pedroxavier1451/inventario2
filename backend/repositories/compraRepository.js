const { Compra, DetalleCompra } = require('../models');
const { Op } = require('sequelize');

// Crear una nueva compra con detalles
const createCompra = async (clienteId, total, iva, detalles) => {
  // detalles: [{ productoId, cantidad, precioUnitario, subtotal }]
  const compra = await Compra.create({ clienteId, total, iva });
  for (const detalle of detalles) {
    await DetalleCompra.create({
      compraId: compra.id,
      productoId: detalle.productoId,
      cantidad: detalle.cantidad,
      precioUnitario: detalle.precioUnitario,
      subtotal: detalle.subtotal
    });
  }
  return compra;
};

// Obtener todas las compras con detalles
const getCompras = async () => {
  return await Compra.findAll({
    include: [{ model: DetalleCompra, as: 'detalles' }]
  });
};

// Obtener compras por cliente
const getCompraById = async (clienteId) => {
  return await Compra.findAll({
    where: { clienteId },
    include: [{ model: DetalleCompra, as: 'detalles' }]
  });
};

// Eliminar compra y sus detalles
const deleteCompra = async (id) => {
  await DetalleCompra.destroy({ where: { compraId: id } });
  await Compra.destroy({ where: { id } });
  return true;
};

// Actualizar una compra y sus detalles
const updateCompra = async (id, compraData, detalles) => {
  // Actualiza la compra principal
  await Compra.update(compraData, { where: { id } });

  // Elimina los detalles anteriores
  await DetalleCompra.destroy({ where: { compraId: id } });

  // Crea los nuevos detalles
  for (const detalle of detalles) {
    await DetalleCompra.create({
      compraId: id,
      productoId: detalle.productoId,
      cantidad: detalle.cantidad,
      precioUnitario: detalle.precioUnitario,
      subtotal: detalle.subtotal
    });
  }

  // Retorna la compra actualizada con sus nuevos detalles
  return await Compra.findByPk(id, {
    include: [{ model: DetalleCompra, as: 'detalles' }]
  });
};

module.exports = {
  createCompra,
  getCompras,
  getCompraById,
  deleteCompra,
  updateCompra
};
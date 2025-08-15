const Compra = require('../models/compra');
const { Op } = require('sequelize');

// Crear una nueva compra
const createCompra = async (clienteId, productoId, cantidad, total) => {
  return await Compra.create({ clienteId, productoId, cantidad, total });
};

// Obtener todas las compras
const getCompras = async () => {
  return await Compra.findAll();
};

// Obtener compras por cliente o producto
const getCompraByClienteOrProducto = async (clienteIdOrProductoId) => {
  return await Compra.findAll({
    where: {
      [Op.or]: [
        { clienteId: clienteIdOrProductoId },
        { productoId: clienteIdOrProductoId }
      ]
    }
  });
};

// Actualizar compra
const updateCompra = async (id, clienteId, productoId, cantidad, total) => {
  const compra = await Compra.findByPk(id);
  if (!compra) {
    throw new Error(`Compra con id ${id} no encontrada`);
  }

  compra.clienteId = clienteId ?? compra.clienteId;
  compra.productoId = productoId ?? compra.productoId;
  compra.cantidad = cantidad ?? compra.cantidad;
  compra.total = total ?? compra.total;

  await compra.save();
  return compra;
};

// Eliminar compra
const deleteCompra = async (id) => {
  const compra = await Compra.findByPk(id);
  if (!compra) {
    throw new Error(`Compra con id ${id} no encontrada`);
  }
  await compra.destroy();
  return true;
};

module.exports = {
  createCompra,
  getCompras,
  getCompraByClienteOrProducto,
  updateCompra,
  deleteCompra
};

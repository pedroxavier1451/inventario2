const compraRepository = require('../repositories/compraRepository');
const compraBusiness = require('../business/compraBusiness');

// Crear una compra
const createCompra = async (clienteId, productoId, cantidad) => {
  const { producto, total } = await compraBusiness.procesarCompra(productoId, cantidad);
  return await compraRepository.createCompra(clienteId, productoId, cantidad, total);
};

// Obtener todas las compras
const getCompras = async () => {
  return await compraRepository.getCompras();
};

// Actualizar compra (solo admin)
const updateCompra = async (id, clienteId, productoId, cantidad, total) => {
  return await compraRepository.updateCompra(id, clienteId, productoId, cantidad, total);
};

// Eliminar compra (solo admin)
const deleteCompra = async (id) => {
  return await compraRepository.deleteCompra(id);
};

module.exports = {
  createCompra,
  getCompras,
  updateCompra,
  deleteCompra
};

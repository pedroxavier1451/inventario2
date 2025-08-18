const compraRepository = require('../repositories/compraRepository');
const compraBusiness = require('../business/compraBusiness');

// Crear una compra
const createCompra = async (clienteId, productos) => {
   const { total, iva, detalles } = await compraBusiness.procesarCompra(clienteId, productos);
  return await compraRepository.createCompra(clienteId, total, iva, detalles);
};

// Obtener todas las compras
const getCompras = async () => {
  return await compraRepository.getCompras();
};

// Actualizar compra (solo admin)
const updateCompra = async (id, compraData, detalles) => {
  return await compraRepository.updateCompra(id, compraData, detalles);
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

const detalleCompraRepository = require('../repositories/detalleCompraRepository');

// Lógica para crear un detalle de compra
const crearDetalleCompra = async (compraId, productoId, cantidad, precioUnitario, subtotal) => {
  // Aquí podrías agregar validaciones adicionales si lo necesitas
  if (!compraId || !productoId || cantidad <= 0 || precioUnitario <= 0 || subtotal < 0) {
    throw new Error('Datos inválidos para el detalle de compra');
  }
  return await detalleCompraRepository.createDetalleCompra(compraId, productoId, cantidad, precioUnitario, subtotal);
};

// Lógica para obtener los detalles de una compra
const obtenerDetallesPorCompra = async (compraId) => {
  if (!compraId) {
    throw new Error('El ID de la compra es obligatorio');
  }
  return await detalleCompraRepository.getDetallesByCompra(compraId);
};

module.exports = {
  crearDetalleCompra,
  obtenerDetallesPorCompra
};
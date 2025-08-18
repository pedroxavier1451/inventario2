const detalleCompraBusiness = require('../business/detalleCompraBusiness');

// Crear un detalle de compra
const crearDetalleCompra = async (compraId, productoId, cantidad, precioUnitario, subtotal) => {
  return await detalleCompraBusiness.crearDetalleCompra(compraId, productoId, cantidad, precioUnitario, subtotal);
};

// Obtener detalles por compra
const obtenerDetallesPorCompra = async (compraId) => {
  return await detalleCompraBusiness.obtenerDetallesPorCompra(compraId);
};

module.exports = {
  crearDetalleCompra,
  obtenerDetallesPorCompra
};
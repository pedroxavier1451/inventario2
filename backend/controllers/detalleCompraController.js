const detalleCompraBusiness = require('../business/detalleCompraBusiness');

// Crear un detalle de compra
const crearDetalleCompra = async (req, res) => {
  try {
    const { compraId, productoId, cantidad, precioUnitario, subtotal } = req.body;
    const detalle = await detalleCompraBusiness.crearDetalleCompra(compraId, productoId, cantidad, precioUnitario, subtotal);
    res.status(201).json(detalle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener detalles por compra
const getDetallesByCompra = async (req, res) => {
  try {
    const { compraId } = req.params;
    const detalles = await detalleCompraBusiness.obtenerDetallesPorCompra(compraId);
    res.status(200).json(detalles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  crearDetalleCompra,
  getDetallesByCompra
};
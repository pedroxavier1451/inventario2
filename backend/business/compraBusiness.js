const compraRepository = require('../repositories/compraRepository');
const productoRepository = require('../repositories/productoRepository');

// Validar la compra (ya existente)
const validarCompraProducto = async (productoId, cantidadSolicitada) => {
  if (!productoId || cantidadSolicitada == null) {
    throw new Error('El ID del producto y la cantidad son obligatorios');
  }

  if (cantidadSolicitada <= 0) {
    throw new Error('La cantidad solicitada debe ser mayor a cero');
  }

  const producto = await productoRepository.obtenerPorId(productoId);
  if (!producto) {
    throw new Error('El producto no existe');
  }

  if (producto.cantidad < cantidadSolicitada) {
    throw new Error(`Stock insuficiente. Disponible: ${producto.cantidad}`);
  }

  if (producto.precio <= 0) {
    throw new Error('El precio del producto no es válido');
  }

  return producto;
};

// Procesar la compra: valida, calcula total y reduce stock
const procesarCompra = async (productoId, cantidadSolicitada) => {
  // Validar la compra
  const producto = await validarCompraProducto(productoId, cantidadSolicitada);

  // Calcular total
  const total = producto.precio * cantidadSolicitada;

  // Reducir stock
  producto.cantidad -= cantidadSolicitada;
  await producto.save();

  // Retornar datos listos para guardar la compra
  return { producto, total };
};

module.exports = {
  validarCompraProducto,
  procesarCompra
};
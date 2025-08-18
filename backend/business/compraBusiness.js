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

// Procesar una compra con varios productos
const procesarCompra = async (clienteId, productos) => {
  // productos: [{ productoId, cantidad }]
  let total = 0;
  const detalles = [];

  for (const item of productos) {
    const producto = await validarCompraProducto(item.productoId, item.cantidad);

    const subtotal = producto.precio * item.cantidad;
    total += subtotal;

    // Reducir stock
    producto.cantidad -= item.cantidad;
    await producto.save();

    detalles.push({
      productoId: item.productoId,
      cantidad: item.cantidad,
      precioUnitario: producto.precio,
      subtotal
    });
  }

  // Calcular IVA
  const iva = total * 0.12;

  return { clienteId, total, iva, detalles };
};

module.exports = {
  validarCompraProducto,
  procesarCompra
};
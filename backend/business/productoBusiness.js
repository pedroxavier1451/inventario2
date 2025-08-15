const productoRepository = require('../repositories/productoRepository');

// Lógica de negocio para crear un producto
const validarDatosProducto = (nombre, categoria, cantidad, precio) => {
  if (!nombre || !categoria || cantidad == null || precio == null) {
    throw new Error('Todos los campos son obligatorios');
  }

  if (cantidad < 0) {
    throw new Error('La cantidad no puede ser negativa');
  }

  if (precio < 0) {
    throw new Error('El precio no puede ser negativo');
  }

  return true;
};

module.exports = { validarDatosProducto };

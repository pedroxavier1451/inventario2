const productoRepository = require('../repositories/productoRepository');
const productoBusiness = require('../business/productoBusiness');

// Función para crear un producto
const createProducto = async (nombre, categoria, cantidad, precio) => {

  // Valida usando reglas de negocio
  productoBusiness.validarDatosProducto(nombre, categoria, cantidad, precio);

  // Guardar el producto en la base de datos
  const producto = await productoRepository.createProducto(nombre, categoria, cantidad, precio);

  return producto;
};

// Función para obtener todos los productos
const getProductos = async () => {
  return await productoRepository.getProductos();
};

const updateProducto = async (id, nombre, categoria, cantidad, precio) => {
  // Validar los datos
  productoBusiness.validarDatosProducto(nombre, categoria, cantidad, precio);

  // Actualizar en la base de datos
  const producto = await productoRepository.updateProducto(id, nombre, categoria, cantidad, precio);
  return producto;
};

// Función para eliminar un producto por ID
const deleteProducto = async (id) => {
  const result = await productoRepository.deleteProducto(id);
  return result;
};

module.exports = {
  createProducto,
  getProductos,
  updateProducto,
  deleteProducto
};
const compraService = require('../services/compraService');

const createCompra = async (req, res) => {
  try {
    const { clienteId, productos } = req.body;
    if (!clienteId || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ message: 'clienteId y productos son requeridos' });
    }
    const compra = await compraService.createCompra(clienteId, productos);
    res.status(201).json(compra);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCompras = async (req, res) => {
  try {
    const compras = await compraService.getCompras();
    res.json(compras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCompraById = async (req, res) => {
  try {
    const { id } = req.params;
    const compra = await compraService.getCompraById(id);
    if (!compra) {
      return res.status(404).json({ message: 'Compra no encontrada' });
    }
    res.json(compra);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCompra = async (req, res) => {
  try {
    const { id } = req.params;
    const { clienteId, productoId, cantidad, total } = req.body;

    const compraActualizada = await compraService.updateCompra(
      id,
      clienteId,
      productoId,
      cantidad,
      total
    );

    res.json(compraActualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCompra = async (req, res) => {
  try {
    const { id } = req.params;
    await compraService.deleteCompra(id);
    res.json({ message: `Compra con id ${id} eliminada correctamente` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createCompra,
  getCompras,
  getCompraById,
  deleteCompra,
  updateCompra
};

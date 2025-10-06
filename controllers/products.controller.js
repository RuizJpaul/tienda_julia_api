import * as ProductModel from '../models/products.model.js';

// Obtener todos los productos
export const getAll = async (req, res) => {
    try {
        const products = await ProductModel.getAllProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener uno
export const getOne = async (req, res) => {
    try {
        const product = await ProductModel.getProductById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear
export const create = async (req, res) => {
    const { name, price, category } = req.body;
    try {
        const newProduct = await ProductModel.createProduct(name, price, category);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar
export const update = async (req, res) => {
    const { name, price, category } = req.body;
    const { id } = req.params;
    try {
        const updated = await ProductModel.updateProduct(id, name, price, category);
        if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar
export const remove = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await ProductModel.deleteProduct(id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener productos por categoría
export const getByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await ProductModel.getProductsByCategory(category);
    if (products.length === 0)
      return res.status(404).json({ message: 'No se encontraron productos en esta categoría' });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 🔍 Buscar por similitud (coincidencia difusa)
export const searchByFuzzy = async (req, res) => {
    const { q } = req.query;
    try {
        const result = await ProductModel.searchByFuzzy(q);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

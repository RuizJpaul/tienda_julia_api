import pool from '../data/db.js';

// Obtener todos los productos
export const getAllProducts = async () => {
    const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
    return result.rows;
};

// Obtener un producto por ID
export const getProductById = async (id) => {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
};

// Crear un nuevo producto
export const createProduct = async (name, price, category) => {
    const result = await pool.query(
        'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *',
        [name, price, category]
    );
    return result.rows[0];
};

// Actualizar un producto
export const updateProduct = async (id, name, price, category) => {
    const result = await pool.query(
        'UPDATE products SET name = $1, price = $2, category = $3 WHERE id = $4 RETURNING *',
        [name, price, category, id]
    );
    return result.rows[0];
};

// Eliminar un producto
export const deleteProduct = async (id) => {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    return { message: 'Producto eliminado correctamente' };
};

// Filtrar productos por categoría
export const getProductsByCategory = async (category) => {
  const result = await pool.query(
    `SELECT * FROM products 
     WHERE category ILIKE $1
     ORDER BY name ASC`,
    [category]
  );
  return result.rows;
};


// 🔍 Búsqueda difusa usando pg_trgm
export const searchByFuzzy = async (query) => {
    const result = await pool.query(
        `SELECT * FROM products
     WHERE similarity(name, $1) > 0.3
     ORDER BY similarity(name, $1) DESC
     LIMIT 20;`,
        [query]
    );
    return result.rows;
};

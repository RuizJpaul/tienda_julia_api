import express from 'express';
import * as ProductController from '../controllers/products.controller.js';

const router = express.Router();

// ✅ Primero las rutas más específicas
router.get('/products/category/:category', ProductController.getByCategory);
router.get('/search/products', ProductController.searchByFuzzy);

// 🔹 Luego las rutas CRUD
router.get('/products', ProductController.getAll);
router.get('/products/:id', ProductController.getOne);
router.post('/products', ProductController.create);
router.put('/products/:id', ProductController.update);
router.delete('/products/:id', ProductController.remove);

export default router;

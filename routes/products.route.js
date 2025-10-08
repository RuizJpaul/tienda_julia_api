import express from 'express';
import * as ProductController from '../controllers/products.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/role.middleware.js';

const router = express.Router();

// ✅ Primero las rutas más específicas
router.get('/products/category/:category', ProductController.getByCategory);
router.get('/search/products', ProductController.searchByFuzzy);

// 🔹 Luego las rutas CRUD
router.get('/products', ProductController.getAll);
router.get('/products/:id', ProductController.getOne);


router.post('/products', verifyToken, isAdmin, ProductController.create);
router.put('/products/:id', verifyToken, isAdmin, ProductController.update);
router.delete('/products/:id', verifyToken, isAdmin, ProductController.remove);

export default router;

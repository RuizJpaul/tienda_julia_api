import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/products.route.js';

// Cargar variables de entorno
dotenv.config();

const app = express();

// Permitir peticiones desde el frontend (React, Vite, etc.)
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', productRoutes);

// Puerto desde .env o por defecto 2000
const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
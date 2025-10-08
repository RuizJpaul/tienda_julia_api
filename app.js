import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/products.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/api', productRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en http://localhost:${PORT}`));

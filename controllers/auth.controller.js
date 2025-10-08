import { pool } from '../data/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key_dev';

// Registrar admin (solo una vez)
export const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Comprobar si ya existe un usuario
    const existing = await pool.query('SELECT * FROM users');
    if (existing.rows.length > 0)
      return res.status(403).json({ error: 'Ya existe un administrador registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error en registerAdmin:', error);
    res.status(500).json({ error: 'Error al registrar el administrador' });
  }
};

// Login del admin
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0)
      return res.status(401).json({ error: 'Usuario no encontrado' });

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

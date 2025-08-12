const express = require('express');
const router = express.Router();
const db = require('../db'); // Tu conexión a la base de datos
const bcrypt = require('bcrypt'); // Para comparar contraseñas encriptadas

// Utilidad para usar sqlite3 con promesas
function dbGet(sql, params) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Buscar usuario por username o email
    const usuario = await dbGet('SELECT * FROM users WHERE username = ? OR email = ?', [username, username]);
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }
    // Validar contraseña (si está encriptada en DB)
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }
    // Aquí podrías generar un token JWT
    res.json({ mensaje: 'Inicio de sesión exitoso', usuario: { id: usuario.id, username: usuario.username } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

module.exports = router;

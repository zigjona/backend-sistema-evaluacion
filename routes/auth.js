
const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

// Login
router.post('/login', async (req, res) => {
  const { correo, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(400).json({ mensaje: 'Usuario no encontrado' });

    const esValida = await usuario.compararContraseña(password);
    if (!esValida) return res.status(400).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET || 'secreto123',
      { expiresIn: '1h' }
    );

    res.json({ token, rol: usuario.rol, nombre: usuario.nombre });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error: err });
  }
});

module.exports = router;

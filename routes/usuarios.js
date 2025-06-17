// 2. REGISTRO DE USUARIO DESDE PANEL ADMIN (routes/usuarios.js)
const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const router = express.Router();

// Crear usuario
router.post('/', async (req, res) => {
  try {
    const { nombre, correo, password, rol } = req.body;
    const existe = await Usuario.findOne({ correo });
    if (existe) return res.status(400).json({ message: 'Correo ya registrado' });

   // const hashedPassword = await bcrypt.hash(password, 10);
   
    const nuevoUsuario = new Usuario({ nombre, correo, password, rol });
    
    await nuevoUsuario.save();

   console.log("✅ Usuario creado:", nuevoUsuario);


    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuario', error: error.message });
  }
});

module.exports = router;
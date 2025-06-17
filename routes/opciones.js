const express = require('express');
const router = express.Router();
const OpcionRespuesta = require('../models/OpcionRespuesta');

// Crear opción de respuesta
router.post('/', async (req, res) => {
  try {
    const { texto, valor, pregunta } = req.body;
    const nueva = new OpcionRespuesta({ texto, valor, pregunta });
    await nueva.save();
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear opción', error: error.message });
  }
});

// Obtener opciones por pregunta
router.get('/porPregunta/:preguntaId', async (req, res) => {
  try {
    const opciones = await OpcionRespuesta.find({ pregunta: req.params.preguntaId });
    res.json(opciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener opciones', error: error.message });
  }
});

module.exports = router;

// routes/preguntas.js
const express = require('express');
const router = express.Router();
const Pregunta = require('../models/Pregunta');

// Crear nueva pregunta por indicador
router.post('/', async (req, res) => {
  try {
    //const { texto, indicador } = req.body;//Se recibe desde el frontend
    // const nuevaPregunta = new Pregunta({ texto, indicador });// se crea una nueva instancia
    const { texto, indicador, tipoRespuesta } = req.body;

    if (!texto || !indicador || !tipoRespuesta) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const nuevaPregunta = new Pregunta({ texto, indicador, tipoRespuesta });


    await nuevaPregunta.save();//Se guarda en la base de datos
    res.status(201).json(nuevaPregunta);//Responde con la nueva pregunta, con una respuesta json
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la pregunta', error: error.message });
  }
});

// Obtener preguntas por indicador
router.get('/porIndicador/:indicadorId', async (req, res) => {
  try {
    const preguntas = await Pregunta.find({ indicador: req.params.indicadorId });
    res.json(preguntas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener preguntas', error: error.message });
  }
});

// Actualizar pregunta por ID
router.put('/:id', async (req, res) => {
  try {
    const { texto } = req.body;
    const preguntaActualizada = await Pregunta.findByIdAndUpdate(
      req.params.id,
      { texto },
      { new: true }
    );
    res.json(preguntaActualizada);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar pregunta', error });
  }
});

// Eliminar pregunta por ID
router.delete('/:id', async (req, res) => {
  try {
    await Pregunta.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pregunta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar pregunta', error });
  }
});


module.exports = router;

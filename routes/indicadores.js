const express = require('express');
const router = express.Router();
const Indicador = require('../models/Indicador');

// Obtener indicadores por criterio con populate completo
router.get('/porCriterio/:criterioId', async (req, res) => {
  try {
    const data = await Indicador.find({ criterio: req.params.criterioId })
      .populate({
        path: 'criterio',
        populate: {
          path: 'facultad'
        }
      });

    res.json(data);
  } catch (error) {
    console.error('Error al obtener indicadores por criterio:', error);
    res.status(500).json({ message: 'Error al obtener indicadores por criterio', error: error.message });
  }
});

// Obtener todos los indicadores
router.get('/', async (req, res) => {
  try {
    const filtro = {};//crea un objeto vacio llamado filtro

    if (req.query.criterioId) {
      filtro.criterio = req.query.criterioId;
    }
    const data = await Indicador.find(filtro)
      .populate({
        path: 'criterio',
        populate: {
          path: 'facultad'
        }
      });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener indicadores', error });
  }
});

// Crear nuevo indicador
router.post('/', async (req, res) => {
  try {
    const nuevoIndicador = new Indicador({
      nombre: req.body.nombre,
      facultad: req.body.facultad,
      programa: req.body.programa,
      criterio: req.body.criterio,
      subcriterio: req.body.subcriterio,
    });

    await nuevoIndicador.save();
    res.status(201).json(nuevoIndicador);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear indicador', error });
  }
});

// Editar indicador
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, facultad, programa, criterio, subcriterio } = req.body;

    const indicadorActualizado = await Indicador.findByIdAndUpdate(
      id,
      { nombre, facultad, programa, criterio, subcriterio },
      { new: true }
    );

    res.json(indicadorActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar indicador', error });
  }
});

// Eliminar indicador
router.delete('/:id', async (req, res) => {
  try {
    await Indicador.findByIdAndDelete(req.params.id);
    res.json({ message: 'Indicador eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar indicador', error });
  }
});


// Obtener todos los indicadores con jerarquía completa para la tabla jerárquica
router.get('/tablaJerarquica', async (req, res) => {
  try {
    const indicadores = await Indicador.find()
      .populate({
        path: 'criterio',
        populate: {
          path: 'facultad',
        }
      }
      )
      
      .populate('preguntas') ;

    res.json(indicadores);
  } catch (error) {
    console.error('Error al obtener tabla jerárquica:', error);
    res.status(500).json({ message: 'Error al obtener tabla jerárquica', error: error.message });
  }
});


module.exports = router;


const express = require('express');
const router = express.Router();
const Respuesta = require('../models/Respuesta');
const Pregunta = require('../models/Pregunta');


//----------------------------------------------------------------------------------------------------------------------------------
router.post('/', async (req, res) => {
  try {
    const { indicador, pregunta, opcion, valor, texto, porcentaje } = req.body;

    // Validar que haya al menos un campo de respuesta
    if (!indicador || !pregunta) {
      return res.status(400).json({ message: 'Indicador y pregunta son obligatorios' });
    }

    if (
      valor === undefined &&
      (texto === undefined || texto === '') &&
      (porcentaje === undefined || porcentaje === null)
    ) {
      return res.status(400).json({ message: 'Debe ingresar al menos un tipo de respuesta (valor, texto o porcentaje)' });
    }

    const nueva = new Respuesta({
      indicador,
      pregunta,
      opcion: opcion || null,
      valor: typeof valor === 'number' ? valor : null,
      texto: texto || null,
      porcentaje: typeof porcentaje === 'number' ? porcentaje : null
    });

    await nueva.save();
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar respuesta', error: error.message });
  }
});
//-para obtener la id de pregunta para graficar por pregunta---------------------------------------------------------------------------------------
router.get('/porPregunta/:preguntaId', async (req, res) => {
  try {
    const respuestas = await Respuesta.find({ pregunta: req.params.preguntaId });
    res.json(respuestas);
  } catch (error) {
    console.error('Error al obtener respuestas por pregunta:', error);
    res.status(500).json({ message: 'Error al obtener respuestas' });
  }
});

//----para graficar---------------------------------------------------------------------------------------------------------
// Agrupar respuestas por preguntaId y calcular promedios
router.get('/agrupado/:preguntaId', async (req, res) => {
  try {
    const respuestas = await Respuesta.find({ pregunta: req.params.preguntaId });

    const agrupadas = respuestas.map((r, i) => ({
      intento: i + 1,
      promedioValor: r.valor ?? null,
      promedioPorcentaje: r.porcentaje ?? null,
    }));

    res.json(agrupadas);
  } catch (error) {
    console.error('Error al agrupar respuestas:', error);
    res.status(500).json({ message: 'Error al agrupar respuestas' });
  }
});


// Ruta para guardar múltiples respuestas a la vez----------------------------------------
router.post('/multiples', async (req, res) => {
  try {
    let { respuestas } = req.body;

    if (!Array.isArray(respuestas) || respuestas.length === 0) {
      return res.status(400).json({ message: 'No hay respuestas para guardar.' });
    }

    // Filtrar respuestas válidas
    const respuestasFiltradas = respuestas
      .filter(r =>
        r.indicador && r.pregunta &&
        (
          typeof r.valor === 'number' ||
          (typeof r.texto === 'string' && r.texto.trim() !== '') ||
          typeof r.porcentaje === 'number'
        )
      )
      .map(r => ({
        indicador: r.indicador,
        pregunta: r.pregunta,
        opcion: r.opcion || null,
        valor: typeof r.valor === 'number' ? r.valor : null,
        texto: typeof r.texto === 'string' ? r.texto.trim() : null,
        porcentaje: typeof r.porcentaje === 'number' ? r.porcentaje : null,
        fecha: new Date(),
        responsable: r.responsable || null,
      }));

    if (respuestasFiltradas.length === 0) {
      return res.status(400).json({ message: 'Todas las respuestas están vacías o mal formateadas.' });
    }

    const resultado = await Respuesta.insertMany(respuestasFiltradas);
    res.status(201).json(resultado);
  } catch (error) {
    console.error('❌ Error al guardar múltiples respuestas:', error);
    res.status(500).json({ message: 'Error al guardar múltiples respuestas', error: error.message });
  }
});


//--------------------------------------------------------------------------------------------


router.get('/promedios', async (req, res) => {
  try {
    const respuestas = await Respuesta.find({
      $or: [{ valor: { $ne: null } }, { porcentaje: { $ne: null } }]
    });

    const agrupado = {};

    for (const r of respuestas) {
      const valor = r.porcentaje ?? r.valor;
      if (valor === null) continue;

      const pid = r.pregunta.toString();

      if (!agrupado[pid]) {
        agrupado[pid] = { total: 0, count: 0 };
      }

      agrupado[pid].total += valor;
      agrupado[pid].count += 1;
    }

    const Pregunta = require('../models/Pregunta');
    const preguntas = await Pregunta.find();

    const promedios = Object.entries(agrupado).map(([preguntaId, datos]) => {
      const pregunta = preguntas.find(p => p._id.toString() === preguntaId);
      return {
        nombre: pregunta ? pregunta.texto : `Pregunta ${preguntaId.slice(-4)}`,
        promedio: parseFloat((datos.total / datos.count).toFixed(2))
      };
    });

    console.log("✅ Promedios calculados:", promedios); // <-- asegúrate de ver esto
    res.json(promedios);
  } catch (error) {
    console.error("❌ Error en /promedios:", error);
    res.status(500).json({ message: 'Error al calcular promedios', error: error.message });
  }
});
//----------------------------------------000-----------------------------------------------------------
// Ruta para que el administrador vea todas las respuestas (con populate)
router.get('/todas', async (req, res) => {
  try {
    const respuestas = await Respuesta.find().sort({ fecha: -1 }) // Ordena por fecha descendente (más recientes primero)
    .populate('pregunta indicador');
    res.json(respuestas);
  } catch (error) {
    console.error('Error al obtener todas las respuestas:', error);
    res.status(500).json({ mensaje: 'Error al obtener respuestas', error: error.message });
  }
});



module.exports = router;




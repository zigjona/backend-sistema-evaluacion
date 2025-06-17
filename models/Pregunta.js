// models/Pregunta.js
const mongoose = require('mongoose');

const PreguntaSchema = new mongoose.Schema({
  texto: { type: String, required: true },
  indicador: { type: mongoose.Schema.Types.ObjectId, ref: 'Indicador', required: true },
  tipoRespuesta: { type: String, enum: ['texto', 'numero', 'porcentaje'], required: true }
});

module.exports = mongoose.model('Pregunta', PreguntaSchema);

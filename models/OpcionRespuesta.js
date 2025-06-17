const mongoose = require('mongoose');

const OpcionRespuestaSchema = new mongoose.Schema({
  texto: { type: String, required: true },
  valor: { type: Number, required: true },
  pregunta: { type: mongoose.Schema.Types.ObjectId, ref: 'Pregunta', required: true }
});

module.exports = mongoose.model('OpcionRespuesta', OpcionRespuestaSchema);

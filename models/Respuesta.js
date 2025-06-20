const mongoose = require('mongoose');

const RespuestaSchema = new mongoose.Schema({
  indicador: { type: mongoose.Schema.Types.ObjectId, ref: 'Indicador', required: true },
  pregunta: { type: mongoose.Schema.Types.ObjectId, ref: 'Pregunta', required: true },
  opcion: { type: mongoose.Schema.Types.ObjectId, ref: 'OpcionRespuesta', default: null },
  valor: { type: Number, default: null },
  texto: { type: String, default: null },
  porcentaje: { type: Number, default: null },
  fecha: { type: Date, default: Date.now },
  responsable: { type: String, default:null }// nombre del usuario que responde

});

module.exports = mongoose.model('Respuesta', RespuestaSchema);

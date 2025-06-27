
const mongoose = require("mongoose");

const IndicadorSchema = new mongoose.Schema({
  nombre: String,
  facultad: { type: mongoose.Schema.Types.ObjectId, ref: 'Facultad' },
  //  programa: { type: mongoose.Schema.Types.ObjectId, ref: 'Programa' },
  criterio: { type: mongoose.Schema.Types.ObjectId, ref: 'Criterio' },
  // subcriterio: { type: mongoose.Schema.Types.ObjectId, ref: "Subcriterio" },
  preguntas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pregunta' }] // ✅ este campo es clave
});

module.exports = mongoose.model("Indicador", IndicadorSchema);

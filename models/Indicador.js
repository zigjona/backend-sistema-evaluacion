
const mongoose = require("mongoose");

const IndicadorSchema = new mongoose.Schema({
  nombre: String,
  facultad: { type: mongoose.Schema.Types.ObjectId, ref: 'Facultad' },
//  programa: { type: mongoose.Schema.Types.ObjectId, ref: 'Programa' },
  criterio: { type: mongoose.Schema.Types.ObjectId, ref: 'Criterio' },
 // subcriterio: { type: mongoose.Schema.Types.ObjectId, ref: "Subcriterio" },
});

module.exports = mongoose.model("Indicador", IndicadorSchema);

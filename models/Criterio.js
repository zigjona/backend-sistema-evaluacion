
const mongoose = require('mongoose');

const CriterioSchema= new mongoose.Schema({
  nombre: String,
  facultad: { type: mongoose.Schema.Types.ObjectId, ref: 'Facultad' },
 // programa: { type: mongoose.Schema.Types.ObjectId, ref: 'Programa' },
});

module.exports = mongoose.model('Criterio', CriterioSchema);


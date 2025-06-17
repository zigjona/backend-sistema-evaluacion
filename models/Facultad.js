const mongoose = require("mongoose");

const FacultadSchema = new mongoose.Schema({
  nombre: String,
});

module.exports = mongoose.model("Facultad", FacultadSchema);

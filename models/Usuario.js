
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  correo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['admin', 'usuario'], default: 'usuario' }
});

UsuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UsuarioSchema.methods.compararContraseña = function (contraseñaIngresada) {
  return bcrypt.compare(contraseñaIngresada, this.password);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);

// server/crearAdmin.js

require('dotenv').config(); // ✅ Carga las variables del archivo .env
const mongoose = require('mongoose');
const Usuario = require('./models/Usuario');

async function crearUsuarioAdmin() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error('❌ MONGO_URI no está definida en el archivo .env');
      return;
    }

    console.log('🔗 Conectando a:', uri);
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const yaExiste = await Usuario.findOne({ correo: 'admin@correo.com' });
    if (yaExiste) {
      console.log('⚠️ El usuario ya existe');
      return process.exit();
    }

    const nuevoAdmin = new Usuario({
      nombre: 'Administrador',
      correo: 'admin@correo.com',
      contraseña: 'admin123', // bcrypt la encriptará automáticamente
      rol: 'admin',
    });

    await nuevoAdmin.save();
    console.log('✅ Usuario administrador creado con éxito');

    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error al crear usuario:', err);
  }
}

crearUsuarioAdmin();

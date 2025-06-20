const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
//app.use(cors());//antes

app.use(cors({//ahora
  origin: 'https://frofrontend-sistema-evaluacion-zigj.vercel.app',
  credentials: true
}));

app.use(express.json());

// Importacion y uso de rutas(conn estos se terminan de crear en mongo las tablas db)
app.use("/api/facultades", require("./routes/facultades"));
app.use("/api/criterios", require("./routes/criterios"));
app.use("/api/indicadores", require("./routes/indicadores"));
app.use('/api/preguntas', require('./routes/preguntas'));
app.use('/api/opciones', require('./routes/opciones'));
app.use('/api/respuestas', require('./routes/respuestas'));
app.use("/api/auth", require("./routes/auth"));
app.use('/api/usuarios', require('./routes/usuarios'));

// Ruta raíz opcional para verificar que está funcionando
app.get('/', (req, res) => {
  res.send('API funcionando correctamente ✔️');
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error MongoDB:", err));


//app.listen(4000, () => {//antes
 // console.log("🚀 Servidor backend en http://localhost:4000");
 //Puerto dinámico (necesario para Render)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend en puerto ${PORT}`);



});
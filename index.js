const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
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


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error MongoDB:", err));

app.listen(4000, () => {
  console.log("🚀 Servidor backend en http://localhost:4000");
});


const express = require("express");
const router = express.Router();
const Criterio = require("../models/Criterio");

// Obtener programas por facultad (si aplica a tu lógica)
//router.get('/porFacultad/:id', async (req, res) => {
 // try {
   // const programas = await Criterio.find({ facultad: req.params.id });
  //  res.json(programas);
  //} catch (err) {
 //   res.status(500).json({ message: 'Error al obtener programas por facultad' });
 // }
//});

// Obtener criterios por facultad
router.get("/porFacultad/:id", async (req, res) => {
  try {
    const criterios = await Criterio.find({ facultad: req.params.id })
      //.populate("programa")
      .populate("facultad");
    res.json(criterios);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener criterios por facultad" });
  }
});




// Obtener todos los criterios
router.get("/", async (req, res) => {
  try {
    const filtro = {};//crea un objeto vacio llamado filtro

    if (req.query.facultadId) {
      filtro.facultad = req.query.facultadId;
    }
    const data = await Criterio.find(filtro)
     // .populate("programa")
      .populate("facultad");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener criterios", error });
  }
});


// Crear un nuevo criterio
router.post("/", async (req, res) => {
  try {
    const nuevoCriterio = new Criterio({
      nombre: req.body.nombre,
     // programa: req.body.programa,
      facultad: req.body.facultad
    });
    await nuevoCriterio.save();
    res.status(201).json(nuevoCriterio);
  } catch (error) {
    res.status(500).json({ message: "Error al crear criterio", error });
  }
});

// Editar un criterio
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, programa, facultad } = req.body;

    const criterioActualizado = await Criterio.findByIdAndUpdate(
      id,
      { nombre, programa, facultad },
      { new: true }
    );
    res.json(criterioActualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar criterio", error });
  }
});

// Eliminar un criterio
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Criterio.findByIdAndDelete(id);
    res.json({ message: "Criterio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar criterio", error });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Facultad = require("../models/Facultad");

// Obtener todas las facultades
router.get("/", async (req, res) => {
  try {
    const data = await Facultad.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener facultades" });
  }
});

// Crear una nueva facultad
router.post("/", async (req, res) => {
  try {
    const nuevaFacultad = new Facultad({ nombre: req.body.nombre });
    await nuevaFacultad.save();
    res.status(201).json(nuevaFacultad);
  } catch (error) {
    res.status(500).json({ message: "Error al crear facultad", error });
  }
});

module.exports = router;

// Editar una facultad
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const facultadActualizada = await Facultad.findByIdAndUpdate(
      id,
      { nombre },
      { new: true }
    );
    res.json(facultadActualizada);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar facultad", error });
  }
});

// Eliminar una facultad
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Facultad.findByIdAndDelete(id);
    res.json({ message: "Facultad eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar facultad", error });
  }
});


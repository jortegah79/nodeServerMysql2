const express = require("express");
const cursosController = require("../controllers/cursosController.js");
const router = express.Router();

//router para estudiantes
router.get("/", cursosController.consultar);
router.post("/", cursosController.ingresar);
router.post("/registroEstudiante", cursosController.asociar_estudiante);

//esto es para evitar la repeticion del id
router
  .route("/:id")
  .get(cursosController.consultarDetalle)
  .put(cursosController.actualizar)
  .delete(cursosController.borrar);

module.exports = router;

const express=require('express')
const router=express.Router();
const estudiantesControllers = require('../controllers/estudiantesController.js');

//router para estudiantes
router.get('/',estudiantesControllers.consultar);
router.post('/',estudiantesControllers.ingresar);

//esto es para evitar la repeticion del id
router.route('/:id')
.get(estudiantesControllers.consultarDetalle)
.put(estudiantesControllers.actualizar)
.delete(estudiantesControllers.borrar)

module.exports=router;
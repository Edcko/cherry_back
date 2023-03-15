import { Router } from "express";
import { sesionController } from "../contollers/sesion.controllers.js";

const router = Router()

//Ruta para obtener todos las sesiones
router.get('/sesiones', sesionController.getSesiones);

//Ruta para obtener una sesion por su ID
router.get('/sesion/:id', sesionController.getSesionById);

//Ruta para crear una nueva sesion
router.post('/sesion', sesionController.createSesion);

//Ruta para actualizar una sesion
router.put('/sesion/:id', sesionController.updateSesion);

//Ruta para eliminar un paquete
router.delete('/sesion/:id', sesionController.deleteSesion);


export default router;
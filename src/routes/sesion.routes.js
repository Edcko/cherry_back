import { Router } from "express";
import { sesionController } from "../contollers/sesion.controllers.js";
import passport from "passport";

const router = Router()

//Ruta para obtener todos las sesiones
router.get('/sesiones', passport.authenticate("jwt", { session: false}), sesionController.getSesiones);

//Ruta para obtener una sesion por su ID
router.get('/sesion/:id', passport.authenticate("jwt", { session: false }), sesionController.getSesionById);

//Ruta para crear una nueva sesion
router.post('/sesion', passport.authenticate("jwt", { session: false }), sesionController.createSesion);

//Ruta para actualizar una sesion
router.put('/sesion/:id', passport.authenticate("jwt", { session: false }), sesionController.updateSesion);

//Ruta para eliminar un paquete
router.delete('/sesion/:id', passport.authenticate("jwt", { session: false }), sesionController.deleteSesion);


export default router;
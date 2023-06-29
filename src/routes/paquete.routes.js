import { Router } from "express";
import { paqueteController } from "../contollers/paquete.controllers.js";
import passport from "passport";

const router = Router()

//Ruta para obtener todos los paquetes
router.get('/paquetes', passport.authenticate("jwt", { session: false }), paqueteController.getPaquetes);

//Ruta para obtener un paquete por su ID
router.get('/paquete/:id', passport.authenticate("jwt", { session: false }), paqueteController.getPaqueteById);

//Ruta para crear un nuevo paquete
router.post('/paquete', passport.authenticate("jwt", { session: false }), paqueteController.createPaquete);

//Ruta para actualizar un paquete
router.put('/paquete/:id', passport.authenticate("jwt", { session: false }), paqueteController.updatePaquete);

//Ruta para eleminar un paquete
router.delete('/paquete/:id', passport.authenticate("jwt", { session: false }), paqueteController.deletePaquete);

export default router;
import { Router } from "express";
import passport from "passport";
import { perteneceAController } from "../contollers/pertenece_a.controllers.js";
import { requiereRole } from "../middlewares/authorization.js";

const router = Router()

// Ruta para obtener todos los paquetes de los spas
router.get('/perteneceA', passport.authenticate("jwt", { session: false }), perteneceAController.getPerteneceA);

// Ruta para obtener todos los paquetes de un espa en especifico
router.get('/perteneceA/:id', passport.authenticate("jwt", { session: false }), perteneceAController.getPerteneceAById);

// Crear nuevo registro de paquete en spa
router.post('/perteneceA', passport.authenticate("jwt", { session: false }), perteneceAController.createPerteceA);

// Ruta para actualizar un paquete específico de un spa específico
router.put('/perteneceA/:spaId/:paqueteId', passport.authenticate("jwt", { session: false }), perteneceAController.updatePertenceA);

// Ruta para eliminar un paquete específico de un spa específico
router.delete('/perteneceA/:spaId/:paqueteId', passport.authenticate("jwt", { session: false }), perteneceAController.deletePerteneceA);

export default router;

import { Router } from "express";
import { trabajaEnController } from "../contollers/trabaja_en.controller.js";
import passport from "passport";

const router = Router()

//Ruta para obtener todos
router.get('/trabajanEn', passport.authenticate("jwt", { session: false }), trabajaEnController.getTrabajanEn);

//Ruta para obtener por ID
router.get('/trabajaEn/:id', passport.authenticate("jwt", { session: false }), trabajaEnController.getTrabajaEnById);

//Crear un nuevo 
router.post('/trabajaEn', passport.authenticate("jwt", { session: false }), trabajaEnController.createTrabajaEn);

//Ruta para actualizar
router.put('/trabajaEn/:id', passport.authenticate("jwt", { session: false }), trabajaEnController.updateTrabajaEn)

//Ruta para eliminar
router.delete('/trabajaEn/:id', passport.authenticate("jwt", { session: false }), trabajaEnController.deleteTrabajaEn);

export default router;
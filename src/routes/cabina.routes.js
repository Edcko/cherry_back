import { Router } from "express";
import { cabinaController } from "../contollers/cabina.controllers.js";
import passport from "passport";

const router = Router()

// Ruta para obtener todas las cabinas
router.get('/cabinas', passport.authenticate("jwt", { session: false }), cabinaController.getCabinas);

// Ruta para obtener cabina por ID
router.get('/cabina/:id', passport.authenticate("jwt", { session: false }), cabinaController.getCabinaById);

// Crear nuevo cabina
router.post('/cabina', passport.authenticate("jwt", { session: false }), cabinaController.createCabina);

// Ruta para actualizar una cabina
router.put('/cabina/:id', passport.authenticate("jwt", { session: false }), cabinaController.updateCabina);

// Ruta para eliminar una cabina
router.delete('/cabina/:id', passport.authenticate("jwt", { session: false }), cabinaController.deleteCabina);

export default router;
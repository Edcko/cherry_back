// routes/bloqueoCabina.routes.js
import { Router } from "express";
import passport from "passport";
import { bloqueoCabinaController } from "../contollers/bloqueo_cabina.controllers.js";

const router = Router();

// Obtener bloqueos por id_spa
router.get("/bloqueos", passport.authenticate("jwt", { session: false }), bloqueoCabinaController.getBloqueos);

// Crear un nuevo bloqueo
router.post("/bloqueo", passport.authenticate("jwt", { session: false }), bloqueoCabinaController.createBloqueo);

// Actualizar un bloqueo
router.put("/bloqueo/:id", passport.authenticate("jwt", { session: false }), bloqueoCabinaController.updateBloqueo);

// Eliminar un bloqueo
router.delete("/bloqueo/:id", passport.authenticate("jwt", { session: false }), bloqueoCabinaController.deleteBloqueo);

// Nueva ruta para obtener bloqueos por rango de fechas
router.get("/bloqueos/daterange", passport.authenticate("jwt", { session: false }), bloqueoCabinaController.getBloqueosByDateRange);

export default router;

import { Router } from "express";
import passport from "passport";
import { valoracionController } from "../contollers/valoracion.controllers.js";
import { requiereRole } from "../middlewares/authorization.js";

const router = Router();

// Rutas básicas
router.get('/valoraciones', passport.authenticate("jwt", { session: false }), valoracionController.getValoraciones);
router.get('/valoracion/:id', passport.authenticate("jwt", { session: false }), valoracionController.getValoracionById);
router.post('/valoracion', passport.authenticate("jwt", { session: false }), valoracionController.createValoracion);
router.put('/valoracion/:id', passport.authenticate("jwt", { session: false }), valoracionController.updateValoracion);
router.delete('/valoracion/:id', passport.authenticate("jwt", { session: false }), valoracionController.deleteValoracion);

// Rutas avanzadas
//router.get('/valoraciones/empleado/:id', passport.authenticate("jwt", { session: false }), valoracionController.valoracionesByEmpleado);
//router.get('/valoraciones/cliente/:id', passport.authenticate("jwt", { session: false }), valoracionController.valoracionesByCliente);
//router.get('/empleado/valoracion/:id', passport.authenticate("jwt", { session: false }), valoracionController.empleadoByValoracion);
//router.get('/cliente/valoracion/:id', passport.authenticate("jwt", { session: false }), valoracionController.clienteByValoracion);

export default router;

import { Router } from "express";
import passport from "passport";
import { configuracionController } from "../contollers/configuracion.controllers.js";
import { requiereRole } from "../middlewares/authorization.js";

const router = Router();

// Ruta para obtener el estado actual de la agenda
router.get(
  '/estado-agenda',
  passport.authenticate("jwt", { session: false }),
  configuracionController.getEstadoAgenda
);

// Ruta para obtener la fecha de apertura de la agenda
router.get(
  '/fecha-apertura',
  passport.authenticate("jwt", { session: false }),
  configuracionController.getFechaApertura
);

// Ruta para actualizar el estado de la agenda
router.put(
  '/estado-agenda',
  passport.authenticate("jwt", { session: false }),
  //requiereRole("Admin"), // Opcional: Solo administradores pueden cambiar el estado
  configuracionController.updateEstadoAgenda
);

// Ruta para actualizar la fecha de apertura de la agenda
router.put(
  '/fecha-apertura',
  passport.authenticate("jwt", { session: false }),
 // requiereRole("Admin"), // Opcional: Solo administradores pueden cambiar la fecha de apertura
  configuracionController.updateFechaApertura
);

export default router;

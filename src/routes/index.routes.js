import { Router } from "express";
import spasRoutes from "./spas.routes.js";
import empleadoRoutes from "./empleado.routes.js";
import clienteRoutes from "./cliente.routes.js";
import paqueteRoutes from "./paquete.routes.js";
import sesionRoutes from "./sesion.routes.js";
import trabajaEnRoutes from "./trabaja_en.routes.js";
import perteneceARoutes from "./pertenece_a.routes.js";
import agendaRoutes from "./agenda.routes.js";
import compraRoutes from "./compra.routes.js";
import cabinaRoutes from "./cabina.routes.js"
import authRoutes from "./auth.routes.js";
import valoracionRoutes from "./valoracion.routes.js";
import configuracionRoutes  from "./configuracion.routes.js";
//import passport from "passport";

const router = Router();

router.use(spasRoutes);

router.use(clienteRoutes);
router.use(paqueteRoutes);
router.use(sesionRoutes);
router.use(trabajaEnRoutes);
router.use(perteneceARoutes);
router.use(authRoutes);
router.use(cabinaRoutes);

// Autenticacion y autorizacion
router.use(agendaRoutes);
router.use(compraRoutes);
router.use(valoracionRoutes);
router.use(empleadoRoutes);

// Configuracion
router.use(configuracionRoutes);

export default router;
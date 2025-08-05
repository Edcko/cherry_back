import { Router } from "express";
import { clientePaqueteSesionesController } from "../contollers/cliente_paquete_sesiones.controllers.js";
import passport from "passport";

const router = Router();

// Obtener todas las sesiones de un cliente
router.get('/cliente/:idCliente/sesiones', 
    passport.authenticate("jwt", { session: false }), 
    clientePaqueteSesionesController.getSesionesByCliente
);

// Obtener sesiones específicas de un cliente para un paquete
router.get('/cliente/:idCliente/paquete/:idPaquete/sesiones', 
    passport.authenticate("jwt", { session: false }), 
    clientePaqueteSesionesController.getSesionesByClienteAndPaquete
);

// Validar si un cliente puede agendar una cita
router.get('/cliente/:idCliente/paquete/:idPaquete/validar-sesion', 
    passport.authenticate("jwt", { session: false }), 
    clientePaqueteSesionesController.validarSesionesDisponibles
);

// Obtener paquetes con sesiones disponibles por cliente
router.get('/cliente/:idCliente/paquetes-con-sesiones', 
    passport.authenticate("jwt", { session: false }), 
    clientePaqueteSesionesController.getPaquetesConSesionesDisponibles
);

// Crear un nuevo registro de sesiones (cuando un cliente compra un paquete)
router.post('/cliente/sesiones', 
    passport.authenticate("jwt", { session: false }), 
    clientePaqueteSesionesController.crearSesionesCliente
);

// Obtener estadísticas de sesiones de un cliente
router.get('/cliente/:idCliente/estadisticas', 
    passport.authenticate("jwt", { session: false }), 
    clientePaqueteSesionesController.getEstadisticasCliente
);

export default router; 
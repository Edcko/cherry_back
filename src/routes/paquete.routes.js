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

// Nuevas rutas para manejo de sesiones restantes
// Ruta para obtener paquetes con sesiones disponibles
router.get('/paquetes/sesiones-disponibles', passport.authenticate("jwt", { session: false }), paqueteController.getPaquetesConSesionesDisponibles);

// Ruta para obtener paquetes por spa con sesiones disponibles
router.get('/paquetes/spa/:idSpa/sesiones-disponibles', passport.authenticate("jwt", { session: false }), paqueteController.getPaquetesPorSpaConSesionesDisponibles);

// Ruta para validar sesiones disponibles de un paquete específico
router.get('/paquete/:idPaquete/validar-sesiones', passport.authenticate("jwt", { session: false }), paqueteController.validarSesionesDisponibles);

export default router;
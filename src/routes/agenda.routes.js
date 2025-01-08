import { Router } from "express";
import passport from "passport";
import { agendaController } from "../contollers/agenda.controllers.js";
import { requiereRole } from "../middlewares/authorization.js";

const router = Router()

//Ruta para obtener todas las citas
router.get('/citas', passport.authenticate("jwt", { session: false }), agendaController.getCitas);

//Ruta para obtener citas por ID
router.get('/cita/:id', passport.authenticate("jwt", { session: false }), /*requiereRole("Admin"),*/ agendaController.getCitaById);

//Crear nueva cita
router.post('/cita', passport.authenticate("jwt", { session: false }), agendaController.createCita);

//Ruta para actualizar una cita
router.put('/cita/:id', passport.authenticate("jwt", { session: false }), agendaController.updateCita);

//Ruta para eliminar una cita
router.delete('/cita/:id', passport.authenticate("jwt", { session: false }), agendaController.deleteCita);

//------------------------- rutas avanzadas -----------------------//

//Ruta para obtener citas asignadas a un empleado por id
router.get('/citas/empleado/:id', agendaController.citasByEmpleado);

//Ruta para obtener citas asignadas a un empleado por nombre
router.get('/citas/cliente/:nombre', agendaController.citasByClienteNombre);

//Ruta para obtener las citas asignadas a una cabina
router.get('/citas/cabina/:id', agendaController.citasByCabina);

//Ruta para obtener informacion del empleado que agendo la cita
router.get('/empleado/cita/:id', agendaController.empleadoByCita);

//Ruta para obtener informacion de la cabina en la que se llevara a cabo una cita especifica
router.get('/cabina/cita/:id', agendaController.cabinaByCita);

//Ruta obtener citas de un cliente en especifico.
router.get('/citas/cliente/:id', agendaController.citasByCliente);

//Ruta para citas con sesiones especificas
router.get('/citas/sesion/:id', agendaController.citasBySesion);

//Ruta para obtener citas en un rango de fechas especifico
router.get('/citas/daterange', agendaController.citasByDateRange);

//Ruta para obtener las citas de una fecha especifica
router.get('/citas/date/fecha', agendaController.citasByDate);

// -------------------- Nueva Ruta: Conteo de Citas por Fecha -------------------- //
// Ruta para obtener el conteo de citas agrupadas por fecha en un rango
router.get(
    '/citas/count',
    passport.authenticate("jwt", { session: false }), // Autenticación opcional
    agendaController.getCitasCountByDateRange
);

// Ruta para reagendar citas
router.post('/citas/reagendar', passport.authenticate("jwt", { session: false }), agendaController.reagendarCita);


export default router;
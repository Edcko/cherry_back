import { Router } from "express";
import passport from "passport";
import { requiereRole } from "../middlewares/authorization.js";
import { empleadoController } from "../contollers/empleado.controllers.js";

const router = Router()

//Ruta para obtener todos los empleados
router.get('/empleados', passport.authenticate("jwt", { session: false }), /*requiereRole('Gerente', 'Admin'), */ empleadoController.getEmpleados);

//Ruta para obtener todos los empleados activos
router.get('/empleados/activos', passport.authenticate("jwt", {session: false}), empleadoController.getAllEmpleadosActivos);

//Ruta para obtener un spa por su ID
router.get('/empleado/:id', passport.authenticate("jwt", {session: false}), empleadoController.getEmpleadoById);

//Ruta para crear un nuevo empleado
router.post('/empleado', passport.authenticate("jwt", {session: false}), /* requiereRole('Gerente','Admin'), */ empleadoController.createEmpleado);

//Ruta para actualizar un empleado
router.put('/empleado/:id', passport.authenticate("jwt", {session: false}), empleadoController.updateEmpleado);

//Ruta para borrar un empleado
router.delete('/empleado/:id', passport.authenticate("jwt", {session: false}), empleadoController.deleteEmpleado);

export default router;
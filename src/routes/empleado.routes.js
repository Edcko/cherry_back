import { Router } from "express";
import { empleadoController } from "../contollers/empleado.controllers.js";

const router = Router()

//Ruta para obtener todos los empleados
router.get('/empleados', empleadoController.getEmpleados);

//Ruta para obtener un spa por su ID
router.get('/empleado/:id', empleadoController.getEmpleadoById);

//Ruta para crear un nuevo empleado
router.post('/empleado', empleadoController.createEmpleado);

//Ruta para actualizar un empleado
router.put('/empleado/:id', empleadoController.updateEmpleado);

//Ruta para borrar un empleado
router.delete('/empleado/:id', empleadoController.deleteEmpleado);

export default router;
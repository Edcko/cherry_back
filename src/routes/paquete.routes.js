import { Router } from "express";
import { paqueteController } from "../contollers/paquete.controllers.js";

const router = Router()

//Ruta para obtener todos los paquetes
router.get('/paquetes', paqueteController.getPaquetes);

//Ruta para obtener un paquete por su ID
router.get('/paquete/:id', paqueteController.getPaqueteById);

//Ruta para crear un nuevo paquete
router.post('/paquete', paqueteController.createPaquete);

//Ruta para actualizar un paquete
router.put('/paquete/:id', paqueteController.updatePaquete);

//Ruta para eleminar un paquete
router.delete('/paquete/:id', paqueteController.deletePaquete);

export default router;
import {Router} from 'express';
import { spaController } from '../contollers/spas.controller.js';

const router = Router()

// Ruta para obtener todos los spas
router.get('/spas', spaController.getSpas);

//Ruta para obtener un spa por su ID
router.get('/spa/:id', spaController.getSpaById);

//Ruta para crear un nuevo spa
router.post('/spa', spaController.createSpa);

// Ruta para actualizar un spa
router.put('/spa/:id', spaController.updateSpa);

// Ruta para eliminar un spa 
router.delete('/spa/:id', spaController.deleteSpa);

//Ruta para obtener todos los empleados de un spa por ID
router.get('/spa/:id/empleados', spaController.getEmployeesBySpaId);


export default router;
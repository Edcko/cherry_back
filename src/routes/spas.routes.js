import {Router} from 'express';
import { spaController } from '../contollers/spas.controller.js';
import passport from 'passport';

const router = Router()

// Ruta para obtener todos los spas
router.get('/spas', passport.authenticate("jwt", { session: false }), spaController.getSpas);

//Ruta para obtener un spa por su ID
router.get('/spa/:id', passport.authenticate("jwt", { session: false }), spaController.getSpaById);

//Ruta para crear un nuevo spa
router.post('/spa', passport.authenticate("jwt", { session: false }), spaController.createSpa);

// Ruta para actualizar un spa
router.put('/spa/:id',  passport.authenticate("jwt", { session: false }), spaController.updateSpa);

// Ruta para eliminar un spa 
router.delete('/spa/:id',  passport.authenticate("jwt", { session: false }), spaController.deleteSpa);

//Ruta para obtener todos los empleados de un spa por ID
router.get('/spa/:id/empleados', passport.authenticate("jwt", { session: false }),spaController.getEmployeesBySpaId);


export default router;
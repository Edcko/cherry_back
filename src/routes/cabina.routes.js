import { Router } from "express";
import { cabinaController } from "../contollers/cabina.controllers.js";

const router = Router()

// Ruta para obtener todas las cabinas
router.get('/cabinas', cabinaController.getCabinas);

// Ruta para obtener cabina por ID
router.get('/cabina/:id', cabinaController.getCabinaById);

// Crear nuevo cabina
router.post('/cabina', cabinaController.createCabina);

// Ruta para actualizar una cabina
router.put('/cabina/:id', cabinaController.updateCabina);

// Ruta para eliminar una cabina
router.delete('/cabina/:id', cabinaController.deleteCabina);

export default router;
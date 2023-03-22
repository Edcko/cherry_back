import { Router } from "express";
import { trabajaEnController } from "../contollers/trabaja_en.controller.js";

const router = Router()

//Ruta para obtener todos
router.get('/trabajanEn', trabajaEnController.getTrabajanEn);

//Ruta para obtener por ID
router.get('/trabajaEn/:id', trabajaEnController.getTrabajaEnById);

//Crear un nuevo 
router.post('/trabajaEn', trabajaEnController.createTrabajaEn);

//Ruta para actualizar
router.put('/trabajaEn/:id', trabajaEnController.updateTrabajaEn)

//Ruta para eliminar
router.delete('/trabajaEn/:id', trabajaEnController.deleteTrabajaEn);

export default router;
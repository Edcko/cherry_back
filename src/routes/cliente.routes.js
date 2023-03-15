import { Router } from "express";
import { clienteController } from "../contollers/cliente.controllers.js";

const router = Router()

// Ruta para obtener todos los clientes
router.get('/clientes', clienteController.getClientes);

// Ruta para obtener un cliente por su id
router.get('/cliente/:id', clienteController.getClienteById );

//Ruta para crear un cliente
router.post('/cliente', clienteController.createCliente);

//Ruta para actualizar un cliente
router.put('/cliente/:id', clienteController.updateCliente );

//Ruta para eliminar un cliente
router.delete('/cliente/:id', clienteController.deleteCliente);

export default router;
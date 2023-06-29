import { Router } from "express";
import passport from "passport";
import { clienteController } from "../contollers/cliente.controllers.js";

const router = Router()

// Ruta para obtener todos los clientes
router.get('/clientes', passport.authenticate("jwt", { session: false }), clienteController.getClientes);

// Ruta para obtener un cliente por su id
router.get('/cliente/:id', passport.authenticate("jwt", { session: false }), clienteController.getClienteById );

//Ruta para crear un cliente
router.post('/cliente', passport.authenticate("jwt", { session: false }), clienteController.createCliente);

//Ruta para actualizar un cliente
router.put('/cliente/:id', passport.authenticate("jwt", { session: false }), clienteController.updateCliente );

//Ruta para eliminar un cliente
router.delete('/cliente/:id', passport.authenticate("jwt", { session: false }), clienteController.deleteCliente);

export default router;
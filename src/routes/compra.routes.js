import { Router } from "express";
import passport from "passport";
import { compraController } from "../contollers/compra.controllers.js";
import { requiereRole } from "../middlewares/authorization.js";

const router = Router();

// Ruta para obtener todas las compras
router.get('/compras', passport.authenticate("jwt", { session: false }), compraController.getCompras);

// Ruta para obtener compras por id_compra
router.get('/compra/:id', passport.authenticate("jwt", { session: false }), compraController.getCompraById);

// Ruta para obtener compra completa con detalles de cliente y paquete
router.get('/compra/:id/completa', passport.authenticate("jwt", { session: false }), compraController.getCompraCompleta);

// Ruta para crear una nueva compra
router.post('/compra', passport.authenticate("jwt", { session: false }), compraController.createCompra);

// Ruta para actualizar una compra
router.put('/compra/:id', passport.authenticate("jwt", { session: false }), compraController.updateCompra);

// Ruta para eliminar una compra
router.delete('/compra/:id', passport.authenticate("jwt", { session: false }), compraController.deleteCompra);

//------------------------- rutas avanzadas -----------------------//

// Ruta para obtener compras por clienteId
router.get('/compras/cliente/:id', compraController.comprasByClienteId);

// Ruta para obtener compras por paqueteId
router.get('/compras/paquete/:id', compraController.comprasByPaqueteId);

// Ruta para obtener cliente por compra IDs (clienteId y paqueteId)
router.get('/cliente/compra/:clienteId/:paqueteId', compraController.clienteByCompraIds);

// Ruta para obtener paquete por compra IDs (clienteId y paqueteId)
router.get('/paquete/compra/:clienteId/:paqueteId', compraController.paqueteByCompraIds);

// Totales agregados
router.get(
  "/ventas/rango",
  passport.authenticate("jwt", { session: false }),
  compraController.getVentasPorRango
);

// Detalle diario
router.get(
  "/ventas/detalle",
  passport.authenticate("jwt", { session: false }),
  compraController.getVentasDetallePorRango
);

// Detalle diario con información de compradores
router.get(
  "/ventas/detalle-compradores",
  passport.authenticate("jwt", { session: false }),
  compraController.getVentasDetalleConCompradores
);

export default router;

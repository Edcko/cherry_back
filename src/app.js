import express from "express";
import spasRoutes from "./routes/spas.routes.js";
import empleadoRoutes from "./routes/empleado.routes.js";
import clienteRoutes from "./routes/cliente.routes.js";
import paqueteRoutes from "./routes/paquete.routes.js";
import sesionRoutes from "./routes/sesion.routes.js";
import TrabajaEnRoutes from "./routes/trabaja_en.routes.js";

const app = express();

// Configuracion del middleware para manejar soclicitudes con formato JSON
app.use(express.json());

// Configuracion de las rutas de la aplicacion
app.use('/cherry', spasRoutes);
app.use('/cherry', empleadoRoutes);
app.use('/cherry', clienteRoutes);
app.use('/cherry', paqueteRoutes);
app.use('/cherry', sesionRoutes);
app.use('/cherry', TrabajaEnRoutes);

//Manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
});

//Inicio del servidor


export { app };
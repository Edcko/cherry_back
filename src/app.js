import express from "express";
import path from 'path'
import cors from "cors";
import routes from "./routes/index.routes.js";
import passport from "passport";
import './config/passport.js';

const app = express();

// Configuracion de cors 
app.use(cors()); //Habilita CORS para todas las rutas

// Asegúrate de usar el mismo directorio que usaste para guardar los archivos PDF
// Configura la carpeta "/var/documents" como una ruta estática en "/documents"
app.use('/documents', express.static('/var/documents'));

// Configuracion del middleware para manejar soclicitudes con formato JSON
app.use(express.json());
app.use(passport.initialize());

// Configuracion de las rutas de la aplicacion
app.use('/cherry', routes);

//Manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
});


export { app };
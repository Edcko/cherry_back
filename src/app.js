import express from "express";
import cors from "cors";
import routes from "./routes/index.routes.js";
import passport from "passport";
import './config/passport.js';

const app = express();

// Configuracion de cors 
app.use(cors({
    origin: 'http://www.gpocherry.com',
    optionsSuccessStatus: 200,
})); //Habilita CORS para todas las rutas


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
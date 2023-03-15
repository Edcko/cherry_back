import { db } from "./config/database.js";
import { app } from "./app.js";

//import './models/Spa.js';
import { Spa } from "./models/Spa.js";

async function main() {
    try{
        await db.sequelize.authenticate();
        console.log('Conexion establecida correctamente.')
        app.listen(3000)
        console.log('Servidor escuchando en el puerto', 3000)
        const spas = await Spa.findAll();
        console.log('Estos son los spas: \n');
        for (let spa of spas){
            console.log(spa.nombre_spa);
            console.log(spa.telefono);
        }
    } catch (error) {
        console.error('Error al conectarse a la base de datos', error);
    }
}

main();
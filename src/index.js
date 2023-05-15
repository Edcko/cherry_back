import { db } from "./config/database.js";
import { app } from "./app.js";

async function main() {
    try{
        await db.sequelize.authenticate();
        console.log('Conexion establecida correctamente.')
        app.listen(3000)
        console.log('Servidor escuchando en el puerto', 3000)
    } catch (error) {
        console.error('Error al conectarse a la base de datos', error);
    }
}

main();
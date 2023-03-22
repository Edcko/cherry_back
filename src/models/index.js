import { Spa } from "./Spa.js";
import { Empleado } from "./Empleado.js";
import { TrabajaEn } from "./Trabaja_en.js";
import { Sesion } from "./Sesion.js";
import { Cliente } from "./Cliente.js";
import { Paquete } from "./Paquete.js";

// Relacion muchos a muchos entre las relaciones Spa - Empleado con la tabla intermedia TrabajaEn
Empleado.belongsToMany(Spa, {through: TrabajaEn, foreignKey: 'id_empleado'});
Spa.belongsToMany(Empleado,{through: TrabajaEn, foreignKey: 'id_spa'});

// Relacion uno a muchos entre Spa - Cliente
//Un Cliente pertenece a un Spa
Cliente.belongsTo(Spa,{
    foreignKey: 'id_spa',
    onDelete: 'restrict',
    onUpdate: 'cascade'
});

//Un Spa tiene muchos Clientes
Spa.hasMany(Cliente,{
    foreignKey: 'id_spa',
    onDelete: 'restrict',
    onUpdate: 'cascade'
});

//Exportar modelos
export { Spa, Empleado, TrabajaEn, Sesion, Cliente, Paquete };
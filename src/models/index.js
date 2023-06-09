import { Spa } from "./Spa.js";
import { Empleado } from "./Empleado.js";
import { TrabajaEn } from "./Trabaja_en.js";
import { Sesion } from "./Sesion.js";
import { Cliente } from "./Cliente.js";
import { Paquete } from "./Paquete.js";
import { Agenda } from "./Agenda.js";
import { Cabina } from "./Cabina.js";

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

// Relacion entre Agenda - Empleado, Sesion, Cliente, Cabina

//El empleado tiene muchas citas o agenda muchas citas
Empleado.hasMany(Agenda,{
    foreignKey: "id_empleado",
    onDelete: 'restrict',
    onUpdate: 'cascade'
});

// Una cita solo la puede agendar un empleado
Agenda.belongsTo(Empleado, {
    foreignKey: "id_empleado",
    onDelete: 'restrict',
    onUpdate: 'cascade'
    
});

//una cabina tiene muchas citas (en diferentes momentos)
Cabina.hasMany(Agenda,{
    foreignKey: "id_cabina",
    onDelete: 'restrict',
    onUpdate: 'cascade'
});

// cada cita se lleva a cabo en una unica cabina
Agenda.belongsTo(Cabina,{
    foreignKey: "id_cabina",
    onDelete: 'restrict',
    onUpdate: 'cascade'
});

// un cliente pede tener muchas citas
Cliente.hasMany(Agenda, {
    foreignKey: "id_cliente",
    onDelete: 'restrict',
    onUpdate: 'cascade'
});

// una cita le pertenece a un solo cliente
Agenda.belongsTo(Cliente, { 
    foreignKey: "id_cliente",
    onDelete: 'restrict',
    onUpdate: 'cascade'
 });

// una sesion puede estar asociada a muchas citas
Sesion.hasMany(Agenda, {
    foreignKey: "id_sesion",
    onDelete: 'restrict',
    onUpdate: 'cascade'
});

// una cita solo puede estar asociada a una sesion
Agenda.belongsTo(Sesion, {
    foreignKey: "id_sesion",
    onDelete: 'restrict',
    onUpdate: 'cascade'

});

//Exportar modelos
export { Spa, Empleado, TrabajaEn, Sesion, Cliente, Paquete, Agenda, Cabina };
import { Spa } from "./Spa.js";
import { PerteneceA } from "./Pertenece_a.js";
import { Empleado } from "./Empleado.js";
import { TrabajaEn } from "./Trabaja_en.js";
import { Sesion } from "./Sesion.js";
import { Cliente } from "./Cliente.js";
import { Paquete } from "./Paquete.js";
import { Agenda } from "./Agenda.js";
import { Compra } from "./Compra.js";
import { Cabina } from "./Cabina.js";
import { Valoracion } from "./Valoracion.js";
import { FeedbackValoracion } from "./Feedback_valoracion.js";

// Relacion muchos a muchos entre las relaciones Spa - Empleado con la tabla intermedia TrabajaEn
Empleado.belongsToMany(Spa, {through: TrabajaEn, foreignKey: 'id_empleado'});
Spa.belongsToMany(Empleado,{through: TrabajaEn, foreignKey: 'id_spa'});

// Relacion uno a muchos entre Empleado - Trabaja_en
Empleado.hasMany(TrabajaEn, { foreignKey: 'id_empleado' });
TrabajaEn.belongsTo(Empleado, { foreignKey: 'id_empleado' });

// Relacion uno a muchos entre Spa - Trabaja_en
Spa.hasMany(TrabajaEn, { foreignKey: 'id_spa' });
TrabajaEn.belongsTo(Spa, { foreignKey: 'id_spa' });

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

// Relacion entre Agenda - Empleado, Sesion, Cliente, Cabina, Spa

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

// Un Spa puede tener muchas citas
Spa.hasMany(Agenda, {
    foreignKey: 'id_spa',
    onDelete: 'restrict',
    onUpdate: 'cascade'
});

// Cada cita pertenece a un solo Spa
Agenda.belongsTo(Spa, {
    foreignKey: 'id_spa',
    onDelete: 'restrict',
    onUpdate: 'cascade'
});

// Relación uno a muchos entre Paquete - Agenda
// Un Paquete puede estar asociado a muchas citas
Paquete.hasMany(Agenda, {
    foreignKey: "id_paquete",
    onDelete: 'restrict',
    onUpdate: 'cascade'
});

// Una cita solo puede estar asociada a un Paquete
Agenda.belongsTo(Paquete, {
    foreignKey: "id_paquete",
    onDelete: 'restrict',
    onUpdate: 'cascade'
});

// Relación uno a muchos entre Paquete - Sesion
// Un Paquete puede contener muchas sesiones
Paquete.hasMany(Sesion, {
    foreignKey: "id_paquete",
    onDelete: 'restrict',
    onUpdate: 'cascade'
});

// Una Sesion puede estar contenida en un solo Paquete
Sesion.belongsTo(Paquete, {
    foreignKey: "id_paquete",
    onDelete: 'restrict',
    onUpdate: 'cascade'
});

// Relacion uno a muchos entre Cabina - Empleado
// una cabina es atendida por un solo empleado
Cabina.belongsTo(Empleado, {
    foreignKey: 'id_empleado',
    onDelete: 'restrict',
    onUpdate: 'cascade'
});

// un empleado puede atender varias cabinas
Empleado.hasMany(Cabina, {
    foreignKey: 'id_empleado',
    onDelete: 'restrict',
    onUpdate: 'cascade'
});


// Relacion uno a muchos entre Cliente - Compra

// Un Cliente puede hacer muchas Compras
Cliente.hasMany(Compra, {
    foreignKey: "id_cliente",
    onDelete: 'restrict',
    onUpdate: 'cascade'
});

// Cada Compra pertenece a un Cliente
Compra.belongsTo(Cliente, {
    foreignKey: "id_cliente",
    onDelete: 'restrict',
    onUpdate: 'cascade'
});

// Relacion uno a muchos entre Paquete - Compra

// Un Paquete puede estar asociado a muchas Compras
Paquete.hasMany(Compra, {
    foreignKey: "id_paquete",
    onDelete: 'restrict',
    onUpdate: 'cascade'
});

// Cada Compra está asociada a un Paquete
Compra.belongsTo(Paquete, {
    foreignKey: "id_paquete",
    onDelete: 'restrict',
    onUpdate: 'cascade'
});


// Relación uno a uno entre Cliente y Valoracion (esto ya está correcto)
Cliente.hasOne(Valoracion, {
    foreignKey: "id_cliente",
    onDelete: 'restrict',
    onUpdate: 'cascade'
});

Valoracion.belongsTo(Cliente, {
    foreignKey: "id_cliente",
    onDelete: 'restrict',
    onUpdate: 'cascade'
});

// Relación uno a uno entre Valoracion y FeedbackValoracion
Valoracion.hasOne(FeedbackValoracion, {
    foreignKey: "id_valoracion",
    onDelete: 'cascade',
    onUpdate: 'cascade'
});

FeedbackValoracion.belongsTo(Valoracion, {
    foreignKey: "id_valoracion",
    onDelete: 'cascade',
    onUpdate: 'cascade'
});

// Relación uno a muchos entre Valoracion y Paquete
Valoracion.hasMany(Paquete, {
    foreignKey: "id_valoracion",
    onDelete: 'restrict',
    onUpdate: 'cascade'
});

Paquete.belongsTo(Valoracion, {
    foreignKey: "id_valoracion",
    onDelete: 'restrict',
    onUpdate: 'cascade'
});

// Relación uno a muchos entre Empleado y Valoracion
Empleado.hasMany(Valoracion, {
    foreignKey: "id_empleado",
    onDelete: 'restrict',
    onUpdate: 'cascade'
});
Valoracion.belongsTo(Empleado, {
    foreignKey: "id_empleado",
    onDelete: 'restrict',
    onUpdate: 'cascade'
});

// Relación uno a muchos entre Cabina y Valoracion
Cabina.hasMany(Valoracion, {
    foreignKey: "id_cabina",
    onDelete: 'restrict',
    onUpdate: 'cascade'
});
Valoracion.belongsTo(Cabina, {
    foreignKey: "id_cabina",
    onDelete: 'restrict',
    onUpdate: 'cascade'
});


// Relación muchos a muchos entre Spa y Paquete a través de PerteneceA
Spa.belongsToMany(Paquete, {
    through: PerteneceA,
    foreignKey: 'id_spa',
    otherKey: 'id_paquete'
});
Paquete.belongsToMany(Spa, {
    through: PerteneceA,
    foreignKey: 'id_paquete',
    otherKey: 'id_spa'
});

// Importante: Definir también las asociaciones inversas para poder incluir Spa y Paquete en las consultas de PerteneceA
PerteneceA.belongsTo(Spa, {
    foreignKey: 'id_spa'
});
PerteneceA.belongsTo(Paquete, {
    foreignKey: 'id_paquete'
});

Spa.hasMany(PerteneceA, {
    foreignKey: 'id_spa'
});
Paquete.hasMany(PerteneceA, {
    foreignKey: 'id_paquete'
});

//Exportar modelos
export { Spa, PerteneceA, Empleado, TrabajaEn, Sesion, Cliente, Paquete, Agenda, Cabina, Compra, Valoracion, FeedbackValoracion };
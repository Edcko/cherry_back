import { db } from "../config/database.js";
import { DataTypes } from "sequelize";
//import { Spa } from "./Spa.js";

const Cliente = db.sequelize.define('cliente', {
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nombre_cliente: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    apellido_paterno:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    apellido_materno: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    tipo_cliente: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    telefono_cliente:{
        type: DataTypes.STRING(12),
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    sexo: {
       type: DataTypes.STRING(1),
       allowNull: false
    },
    id_spa:{
        type: DataTypes.INTEGER,
        allowNull: false,        
    }, 

}, {
    timestamps: false,
    tableName: 'cliente'
});

/*
Cliente.belongsTo(Spa, { 
    foreignKey: 'id_spa',
    onDelete: 'restrict',
    onUpdate: 'cascade'
});
*/

export { Cliente };
import { DataTypes } from "sequelize";
import { db } from "../config/database.js";

const Empleado = db.sequelize.define('empleado',{
    id_empleado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nombre_empleado: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    apellido_paterno:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    apellido_materno:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    tipo_empleado: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    telefono_empleado: {
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
    }
    
 }, {
        timestamps: false,
        tableName: 'empleado'    
});

export {Empleado};
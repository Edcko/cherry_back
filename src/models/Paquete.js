import { db } from "../config/database.js";
import { DataTypes } from "sequelize";

const Paquete =  db.sequelize.define('paquete', {
    id_paquete:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    nombre_paquete: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true
    },
    descripcion: {
        type: DataTypes.STRING(800),
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT(15),
        allowNull: false
    },
    fecha_inicio: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    fecha_fin: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_empleado: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'paquete'
});

export { Paquete };
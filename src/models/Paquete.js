import { db } from "../config/database.js";
import { DataTypes, Model } from "sequelize";

class Paquete extends Model{}

Paquete.init({
    id_paquete:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    estado_paquete: {
        type: DataTypes.TEXT(),
        allowNull: false
    },
    imagen_paquete: {
        type: DataTypes.STRING(152),
        allowNull: false,
    }
}, {
    sequelize: db.sequelize,
    modelName: 'Paquete',
    tableName: 'paquete',
    timestamps: false,
});

export { Paquete };
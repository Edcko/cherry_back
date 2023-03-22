import { db } from "../config/database.js";
import { DataTypes, Model } from "sequelize";

class Sesion extends Model{}

Sesion.init({
    id_sesion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    },
    numero_sesion:{
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    descripcion:{
    type: DataTypes.TEXT,
    allowNull: false
    },
    fecha: {
    type: DataTypes.DATE,
    allowNull: true
    },
    fecha_cancelacion:{
    type: DataTypes.DATE,
    allowNull: true
    }
},{
    sequelize: db.sequelize,
    modelName: 'Sesion',
    tableName: 'sesion',
    timestamps: false,
});

export { Sesion };
    


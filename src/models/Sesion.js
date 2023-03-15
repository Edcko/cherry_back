import { db } from "../config/database.js";
import { DataTypes } from "sequelize";

const Sesion = db.sequelize.define('sesion',{
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
    timestamps: false,
    tableName: 'sesion'
});

export { Sesion };
    


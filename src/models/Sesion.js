import { db } from "../config/database.js";
import { DataTypes, Model } from "sequelize";
import { Empleado } from "./Empleado.js";

class Sesion extends Model {}

Sesion.init(
  {
    id_sesion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    id_empleado: {
      type: DataTypes.INTEGER,
      references: {
        model: Empleado,
        key: "id_empleado",
      },
    },

    numero_sesion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
<<<<<<< HEAD
    fecha_cancelacion:{
    type: DataTypes.DATE,
    allowNull: true
=======

    descripcion: {
      type: DataTypes.TEXT,
    },

    duracion: {
      type: DataTypes.TIME,
>>>>>>> dev/implementacion-autenticacion
    }
  },
  {
    sequelize: db.sequelize,
    modelName: "Sesion",
    tableName: "sesion",
    timestamps: false,
  }
);

export { Sesion };
    


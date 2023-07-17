import { db } from "../config/database.js";
import { DataTypes, Model } from "sequelize";
import { Empleado } from "./Empleado.js";
import { Paquete } from "./Paquete.js";

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

    descripcion: {
      type: DataTypes.TEXT,
    },

    duracion: {
      type: DataTypes.TIME,
    },
    id_paquete: {
      type: DataTypes.INTEGER,
      references: {
        model: Paquete,
        key: "id_paquete",
      }
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
    


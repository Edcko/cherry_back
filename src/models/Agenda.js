import { DataTypes, Model } from "sequelize";
import { db } from "../config/database.js";
import { Empleado} from "./Empleado.js"; 
import { Cliente } from "./Cliente.js";
import { Sesion } from "./Sesion.js";
import { Cabina } from "./Cabina.js";

class Agenda extends Model {}

Agenda.init(
  {
    id_cita: {
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
    id_cabina: {
      type: DataTypes.INTEGER,
      references:{
        model: Cabina,
        key: "id_cabina"
      }
         
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      references: {
        model: Cliente,
        key: "id_cliente",
      },
    },
    id_sesion: {
      type: DataTypes.INTEGER,
      references: {
        model: Sesion,
        key: "id_sesion",
      },
    },
    fecha: {
      type: DataTypes.DATE,
    },
    fecha_cancelacion: { type: DataTypes.DATE },
    estado:{ type: DataTypes.TEXT}
  },
  {
    sequelize: db.sequelize,
    modelName: "Agenda",
    tableName: "agenda",
    timestamps: false,
  }
);

export {Agenda};
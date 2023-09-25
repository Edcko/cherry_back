import { DataTypes, Model } from "sequelize";
import { db } from "../config/database.js";
import { Cliente } from "./Cliente.js";
import { Empleado } from "./Empleado.js";
import { Cabina } from "./Cabina.js";
import { Paquete } from "./Paquete.js";

class Valoracion extends Model {}

Valoracion.init(
  {
    id_valoracion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      references: {
        model: Cliente,
        key: "id_cliente",
      },
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
      references: {
        model: Cabina,
        key: "id_cabina",
      },
    },
    fecha_valoracion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fecha_cancelacion: {
      type: DataTypes.DATE,
    },
    estado: {
      type: DataTypes.STRING(20),
    },
    observaciones: {
      type: DataTypes.TEXT,
    },
    recomendaciones: {
      type: DataTypes.TEXT,
    },
    resultado: {
      type: DataTypes.BOOLEAN,
    },
    paquete_recomendado: {
      type: DataTypes.INTEGER,
      references: {
        model: Paquete,
        key: "id_paquete",
      },
    }
  },
  {
    sequelize: db.sequelize,
    modelName: "Valoracion",
    tableName: "valoracion",
    timestamps: false,
  }
);

export { Valoracion };
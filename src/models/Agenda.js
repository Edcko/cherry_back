import { DataTypes, Model } from "sequelize";
import { db } from "../config/database.js";
import { Empleado } from "./Empleado.js"; 
import { Cliente } from "./Cliente.js";
import { Sesion } from "./Sesion.js";
import { Cabina } from "./Cabina.js";
import { Paquete } from "./Paquete.js";
import { Spa } from "./Spa.js";

class Agenda extends Model {}

Agenda.init(
  {
    id_cita: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    id_cita_origen: {
      type: DataTypes.INTEGER,
      allowNull: true, // Puede ser null para citas nuevas
      references: {
        model: 'Agenda',
        key: 'id_cita'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
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
    id_spa: {
      type: DataTypes.INTEGER,
      references: {
        model: Spa,
        key: "id_spa",
      },
    },
    fecha: {
      type: DataTypes.DATE,
    },
    fecha_cancelacion: {
      type: DataTypes.DATE,
    },
    hora_inicio: {
      type: DataTypes.TIME,
    },
    hora_fin: {
      type: DataTypes.TIME,
    },
    estado: {
      type: DataTypes.STRING(20),
    },
    id_paquete: {
      type: DataTypes.INTEGER,
      references: {
        model: Paquete,
        key: "id_paquete",
      },
    },
    numero_visita:{
      type: DataTypes.INTEGER,

    },
    tipo_cita: {
      type: DataTypes.STRING(35),
    },

  },
  {
    sequelize: db.sequelize,
    modelName: "Agenda",
    tableName: "agenda",
    timestamps: false,
  }
);

export {Agenda};

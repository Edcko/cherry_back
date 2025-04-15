// models/BloqueoCabina.js
import { DataTypes, Model } from "sequelize";
import { db } from "../config/database.js";
import { Cabina } from "./Cabina.js";
import { Spa } from "./Spa.js";

class BloqueoCabina extends Model {}

BloqueoCabina.init(
  {
    id_bloqueo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_cabina: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cabina,
        key: "id_cabina",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    id_spa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Spa,
        key: "id_spa",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    fecha_bloqueo: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    motivo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize: db.sequelize,
    modelName: "BloqueoCabina",
    tableName: "bloquear_cabina",
    timestamps: false,
  }
);

export { BloqueoCabina };

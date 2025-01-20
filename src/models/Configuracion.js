import { DataTypes, Model } from "sequelize";
import { db } from "../config/database.js";
import { Spa } from "./Spa.js";

class Configuracion extends Model {}

Configuracion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_spa: {
        type: DataTypes.INTEGER,
        references: {
          model: Spa,
          key: "id_spa",
        },
      },      
    clave: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    valor: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: db.sequelize,
    modelName: "Configuracion",
    tableName: "configuracion",
    timestamps: false,
  }
);

export { Configuracion };

import { DataTypes, Model } from "sequelize";
import { db } from "../config/database.js";
import { Valoracion } from "./Valoracion.js";

class FeedbackValoracion extends Model {}

FeedbackValoracion.init(
  {
    id_feedback: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_valoracion: {
      type: DataTypes.INTEGER,
      references: {
        model: Valoracion,
        key: "id_valoracion",
      },
    },
    calificacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comentario: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize: db.sequelize,
    modelName: "FeedbackValoracion",
    tableName: "feedback_valoracion",
    timestamps: false,
  }
);

export { FeedbackValoracion };

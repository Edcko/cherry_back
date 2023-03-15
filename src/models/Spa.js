import { DataTypes, Model } from "sequelize";
import { db } from "../config/database.js";
import { Cliente } from "./Cliente.js";

//class Spa extends Model {}

 const Spa = db.sequelize.define('spa', {
    id_spa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      nombre_spa: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      ciudad: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      calle: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      colonia: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      codigo_postal: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      telefono: {
        type: DataTypes.STRING(12),
        allowNull: false
      }
    }, {
      timestamps: false,
      tableName: 'spa'
});

Spa.hasMany(Cliente, {
  foreignKey: 'id_spa',
  onDelete: 'restrict',
  onUpdate: 'cascade'
});

export {Spa};
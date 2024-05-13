import { db } from "../config/database.js"
import { DataTypes, Model } from "sequelize"
import { Spa } from "./Spa.js"
import { Paquete } from "./Paquete.js"

class PerteneceA extends Model{}

PerteneceA.init({
    id_spa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Spa,
            key: 'id_spa',
            onDelete: 'restrict',
            onUpdate: 'cascade',
        },
    },
    id_paquete: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Paquete,
            key: 'id_paquete',
            onDelete: 'restrict',
            onUpdate: 'cascade',
        },
    },
}, {
    sequelize: db.sequelize,
    modelName: 'PerteneceA',
    tableName: 'pertenece_a',
    timestamps: false,
});

export { PerteneceA };
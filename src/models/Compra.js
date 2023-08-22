import { DataTypes, Model } from "sequelize";
import { db } from "../config/database.js";
import { Cliente } from "./Cliente.js";
import { Paquete } from "./Paquete.js";

class Compra extends Model {}

Compra.init(
    {
        id_cliente:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            references:{
                model: Cliente,
                key: "id_cliente"
            },
        },

        id_paquete:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            references:{
                model: Paquete,
                key: "id_paquete",
            },
        },

        fecha_compra:{
            type: DataTypes.DATE,
        },
        monto_original:{
        type: DataTypes.DECIMAL(12,2),
        },
        monto_pagado:{
            type: DataTypes.DECIMAL(12,2),        
        },
        monto_adeudado:{
            type: DataTypes.DECIMAL(12,2),
        },
        estado_compra:{
            type: DataTypes.STRING(20),
        },
    },
    {
        sequelize: db.sequelize,
        modelName: "Compra",
        tableName: "compra",
        timestamps: false,
    }
);

export { Compra };
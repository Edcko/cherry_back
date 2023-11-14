import { DataTypes, Model } from 'sequelize';
import { db } from '../config/database.js';
import { Cliente } from './Cliente.js'; 
import { Paquete } from './Paquete.js';

class Compra extends Model {}

Compra.init({
    id_compra: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        references: {
            model: Cliente,
            key: 'id_cliente'
        }
    },
    id_paquete: {
        type: DataTypes.INTEGER,
        references: {
            model: Paquete,
            key: 'id_paquete'
        }
    },
    fecha_compra: {
        type: DataTypes.DATE,
        allowNull: false
    },
    monto_original: {
        type: DataTypes.NUMERIC(12, 2)
    },
    monto_pagado: {
        type: DataTypes.NUMERIC(12, 2),
        defaultValue: 0
    },
    monto_adeudado: {
        type: DataTypes.NUMERIC(12, 2),
        defaultValue: 0
    },
    estado_compra: {
        type: DataTypes.STRING(20)
    }
}, {
    sequelize: db.sequelize,
    modelName: 'Compra',
    tableName: 'compra',
    timestamps: false
});

export { Compra };

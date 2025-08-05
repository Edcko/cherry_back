import { db } from "../config/database.js";
import { DataTypes, Model } from "sequelize";
import { Cliente } from "./Cliente.js";
import { Paquete } from "./Paquete.js";

class ClientePaqueteSesiones extends Model{}

ClientePaqueteSesiones.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cliente,
            key: "id_cliente",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }
    },
    id_paquete: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Paquete,
            key: "id_paquete",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }
    },
    sesiones_compradas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    sesiones_usadas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    sesiones_restantes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    fecha_compra: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    estado: {
        type: DataTypes.ENUM('Activo', 'Agotado', 'Expirado'),
        allowNull: false,
        defaultValue: 'Activo'
    }
}, {
    sequelize: db.sequelize,
    modelName: 'ClientePaqueteSesiones',
    tableName: 'cliente_paquete_sesiones',
    timestamps: false,
});

export { ClientePaqueteSesiones }; 
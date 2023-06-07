import { db } from "../config/database.js";
import { DataTypes, Model } from "sequelize";

class Cliente extends Model{}

Cliente.init({
    id_cliente: {
        type: DataTypes.INTEGER,
<<<<<<< HEAD
        primaryKey: true,
        autoIncrement: true
=======
        autoIncrement: true,
        primaryKey: true
>>>>>>> dev/implementacion-autenticacion
    },
    nombre_cliente: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    apellido_paterno:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    apellido_materno: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    tipo_cliente: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    telefono_cliente:{
        type: DataTypes.STRING(12),
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    sexo: {
       type: DataTypes.STRING(1),
       allowNull: false
    },
    id_spa:{
        type: DataTypes.INTEGER,
        allowNull: false,        
    }, 

}, {
    sequelize: db.sequelize,
    modelName: 'Cliente',
    tableName: 'cliente',
    timestamps: false,
});

export { Cliente };
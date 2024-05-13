import { DataTypes, Model } from "sequelize";
import { db } from "../config/database.js";
import { Empleado } from "./index.js"; 

class Cabina extends Model{}

Cabina.init(
    {
        id_cabina:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        numero_cabina:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        estado_cabina:{
            type: DataTypes.TEXT(),
            allowNull: false,
        },

        id_empleado:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references:{
                model: Empleado,
                key: "id_empleado"
            },

        },
        turno:{
            type: DataTypes.TEXT(),
            allowNull: false,
        },
        id_spa:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    },
    {
        sequelize: db.sequelize,
        modelName: "Cabina",
        tableName: "cabina",
        timestamps: false,
    }    
 );

 export { Cabina };
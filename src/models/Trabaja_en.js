import { db } from "../config/database.js"
import { DataTypes, Model } from "sequelize"
import { Empleado } from "./Empleado.js"
import { Spa } from "./Spa.js"

class TrabajaEn extends Model{}

TrabajaEn.init({   
        id_empleado:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references:{
                model: Empleado,
                key: "id_empleado",
                onDelete: "restrict",
                onUpdate: "cascade",
            },
        },
        id_spa:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: Spa,
                key: 'id_spa',
                onDelete: 'restrict',
                onUpdate: 'cascade',
            },

        },
        puesto:{
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        salario:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },


    }, {
        sequelize: db.sequelize,
        modelName: 'Trabaja_en',
        tableName: 'trabaja_en',
        timestamps: false,
        

    }    
);

export { TrabajaEn };
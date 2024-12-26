import { db } from "../config/database.js"; // Ajusta la ruta si es necesario
const { sequelize } = db; // Extrae la instancia de sequelize
import { Valoracion, Cliente, Empleado, Cabina, Paquete, Spa } from "../models/index.js";

const valoracionService = {
    async getAllValoraciones(idSpa){
        const today = new Date();
        today.setHours(0,0,0,0); // Establecer el inicio del día actual

        return await Valoracion.findAll({
            where: { id_spa: idSpa },
            include: [
                {
                    model: Empleado,
                    attributes: ["nombre_empleado", "apellido_paterno", "apellido_materno"],
                },
                {
                    model: Cliente,
                    attributes: ["nombre_cliente", "apellido_paterno", "apellido_materno"],
                },
                {
                    model: Cabina,
                    attributes: ["numero_cabina","turno","estado_cabina"],
                    include: [{
                        model: Empleado,
                        attributes: ["nombre_empleado", "apellido_paterno", "apellido_materno"],
                    }],
                },
                {
                    model: Paquete,
                    attributes: ["nombre_paquete"],
                },
                {
                    model: Spa,
                    attributes: ["nombre_spa", "ciudad", "calle", "colonia", "codigo_postal", "telefono"],
                },
            ],
            order: [
                [
                    // Lógica para agrupar según las fechas
                    sequelize.literal(`CASE
                        WHEN "fecha_valoracion" >= '${today.toISOString()}' THEN 0
                        WHEN "fecha_valoracion" < '${today.toISOString()}' THEN 1
                        ELSE 2
                    END`),
                    "ASC",
                ],
                [ "fecha_valoracion", "ASC" ] // Ordenar por fecha dentro de cada grupo
            ],
        });
    },

     // Obtener valoraciones por rango de fechas para un spa
     async getValoracionesByDateRange(idSpa, startDate, endDate) {
        return await Valoracion.findAll({
            where: {
                id_spa: idSpa,
                fecha_valoracion: {
                    [Op.between]: [startDate, endDate],
                },
            },
            include: [
                {
                    model: Cliente,
                    attributes: ["nombre_cliente", "apellido_paterno", "apellido_materno"],
                },
                {
                    model: Empleado,
                    attributes: ["nombre_empleado", "apellido_paterno", "apellido_materno"],
                },
                {
                    model: Spa,
                    attributes: ["nombre_spa", "ciudad", "calle", "colonia", "codigo_postal", "telefono"],
                },
            ],
        });
    },

    async getValoracionById(id){
        return await Valoracion.findByPk(id);
    },
    async createValoracion(data){
        return await Valoracion.create(data);
    },
    async updateValoracion(id, data){
        const valoracion = await Valoracion.findOne({ where: { id_valoracion: id } });
        if(valoracion){
            return await valoracion.update(data);
        } else {
            return null;
        }
    },
    async deleteValoracion(id){
        const valoracion = await Valoracion.findOne({ where: { id_valoracion: id } });
        if(valoracion){
            await valoracion.destroy();
        }
        return valoracion;
    },

    async getValoracionesByDateRange(idSpa, starDate, endDate){
        return await Valoracion.findAll({
            where: {
                id_spa: idSpa,
                fecha_valoracion: {
                    [Op.between]: [starDate, endDate],
                },
            },
            include: [
                {
                    model: Empleado,
                    attributes: ["nombre_empleado", "apellido_paterno", "apellido_materno"],
                }
            ]
        });
    },

    async searchValoraciones({ keyword, fecha }) {
        // Condición inicial
        const conditions = [];
    
        // Agregar condiciones basadas en el keyword si este está presente
        if (keyword) {
            conditions.push({
                [Op.or]: [
                    { '$Cliente.nombre_cliente$': { [Op.like]: `%${keyword}%` } },
                    { '$Cliente.apellido_paterno$': { [Op.like]: `%${keyword}%` } },
                    { '$Cliente.apellido_materno$': { [Op.like]: `%${keyword}%` } }
                ]
            });
        }
    
        // Agregar condición basada en la fecha si esta está presente
        if (fecha) {
            conditions.push(Sequelize.where(Sequelize.fn('DATE', Sequelize.col('fecha_valoracion')), '=', fecha));
        }
    
        // Realizar la consulta con las condiciones acumuladas
        return await Valoracion.findAll({
            where: {
                [Op.and]: conditions
            },
        });
    }
    
    


}
export { valoracionService };

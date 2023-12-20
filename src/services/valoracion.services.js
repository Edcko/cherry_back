import { Valoracion, Cliente, Empleado, Cabina, Paquete  } from "../models/index.js";

const valoracionService = {
    async getAllValoraciones(){
        return await Valoracion.findAll({
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
            ]
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

    async getValoracionesByDateRange(starDate, endDate){
        return await Valoracion.findAll({
            where: {
                fecha_valoracion: {
                    [Op.between]: [starDate, endDate],
                },
            },
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

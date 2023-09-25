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
    }
}
export { valoracionService };

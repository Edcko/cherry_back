import { Valoracion } from "../models/Valoracion.js";

const valoracionService = {
    async getAllValoraciones(){
        return await Valoracion.findAll({
            
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

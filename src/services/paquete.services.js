import { Cliente, Paquete } from "../models/index.js";

const paqueteService = {

    async getAllPaquetes(){
        return await Paquete.findAll();
    },
    
    async getPaqueteById(id){
        return await Paquete.findOne({ where: {id_paquete: id}});
    },

    async createPaquete(data){
        return await Paquete.create(data);
    },

    async updatePaquete(id, data){

        const paquete = await Paquete.findOne({ where: { id_paquete: id } });
        if(paquete){
            return await paquete.update(data);
        } else {
            return null;
        }
    },

    async deletePaquete(id){
        const paquete = await Paquete.findOne({ where: {id_paquete: id} });
        if(paquete){
            await paquete.destroy();
        }
        return paquete;
    },

}

export { paqueteService };
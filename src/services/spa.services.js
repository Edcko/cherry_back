import { Spa } from "../models/index.js";

const spaService = {
    
    async getAllSpas(){
        return  await Spa.findAll();
    },

    async getSpaById(id){
        return await Spa.findOne({ where: {id_spa: id} });
    },

    async createSpa(data){
        return await Spa.create(data);
    },

    async updateSpa(id, data){

        const spa = await Spa.findOne({ where: {id_spa: id} });
        if(spa){
            return await spa.update(data);
        } else {
            return null;
        }
    },

    async deleteSpa(id){
        const spa = await Spa.findOne({ where: { id_spa: id } });
        if(spa){
            await spa.destroy();
        }
        return spa;
    }

}

export{ spaService };
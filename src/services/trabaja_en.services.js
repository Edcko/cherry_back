import { TrabajaEn } from "../models/index.js";

const trabajaEnService = {

    async getAllTrabajanEn(){
        return await TrabajaEn.findAll();
    }, 

    async getTrabajaEnById(id){
        return await TrabajaEn.findOne({ where: { id_empleado: id } })
    },

    async createTrabajaEn(data){
        return await TrabajaEn.create(data);
    },

    async updateTrabajaEn(id, data){

        const trabajaEn = await TrabajaEn.findOne({ where: { id_empleado: id } });
        if(trabajaEn){
            return await trabajaEn.update(data);
        } else {
            return null;
        }
    },


    async deleteTrabajaEn(id){

        const trabajaEn = await TrabajaEn.findOne({ where: { id_empleado: id} });
        if(trabajaEn){
            await trabajaEn.destroy();
        } 
        return trabajaEn;
    },

}

export { trabajaEnService }
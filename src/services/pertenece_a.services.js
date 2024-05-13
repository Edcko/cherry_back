import { PerteneceA, Spa, Paquete } from "../models/index.js";

const perteneceAService = {

    async getAllPerteneceA(){
        return await PerteneceA.findAll({
            include: [
                {
                    model: Spa,  // Incluye información del Spa
                    attributes: ['nombre_spa', 'ciudad', 'calle', 'colonia', 'codigo_postal', 'telefono']
                },
                {
                    model: Paquete,  // Incluye información del Paquete
                    attributes: ["nombre_paquete", "descripcion", "precio"],
                },
            ],
        });
    },
    
    async getPerteneceABySpa(idSpa){
        // Asume que quieres obtener todos los paquetes asociados a un Spa específico
        return await PerteneceA.findAll({
            where: { id_spa: idSpa },
            include: [
                {
                    model: Paquete,
                    attributes: ["nombre_paquete", "descripcion", "precio"],
                },
            ],
        });
    },
    

  async createPerteneceA(data){
    return await PerteneceA.create(data);
},

async updatePerteneceA(idSpa, idPaquete, data){
    const PerteneceA = await PerteneceA.findOne({
        where: { id_spa: idSpa, id_paquete: idPaquete }
    });
    if(PerteneceA){
        return await PerteneceA.update(data);
    } else {
        return null;
    }
},

async deletePertenceA(idSpa, idPaquete){
    const PerteneceA = await PerteneceA.findOne({
        where: { id_spa: idSpa, id_paquete: idPaquete }
    });
    if(PerteneceA){
        await PerteneceA.destroy();
        return PerteneceA;
    }
    return null;
},


};

export { perteneceAService };
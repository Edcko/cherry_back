import { Cliente, Paquete } from "../models/index.js";
import { db } from "../config/database.js";

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

    // Nuevo método para validar si un paquete tiene sesiones disponibles
    async validarSesionesDisponibles(idPaquete){
        const paquete = await Paquete.findOne({ 
            where: { id_paquete: idPaquete } 
        });
        
        if (!paquete) {
            throw new Error('Paquete no encontrado');
        }
        
        return paquete.sesiones_restantes > 0;
    },

    // Método para obtener paquetes con sesiones disponibles
    async getPaquetesConSesionesDisponibles(){
        return await Paquete.findAll({
            where: {
                sesiones_restantes: {
                    [db.Sequelize.Op.gt]: 0
                }
            }
        });
    },

    // Método para obtener paquetes por spa con sesiones disponibles
    async getPaquetesPorSpaConSesionesDisponibles(idSpa){
        const { PerteneceA } = await import("../models/index.js");
        
        return await Paquete.findAll({
            include: [{
                model: PerteneceA,
                where: { id_spa: idSpa },
                attributes: []
            }],
            where: {
                sesiones_restantes: {
                    [db.Sequelize.Op.gt]: 0
                }
            }
        });
    }

}

export { paqueteService };
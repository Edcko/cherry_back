import { TrabajaEn, Empleado, Spa } from "../models/index.js";

const trabajaEnService = {

    async getAllTrabajanEn(){
        return await TrabajaEn.findAll({
            include: [
                {
                    model: Empleado,
                    attributes: ["nombre_empleado", "apellido_paterno", "apellido_materno", "tipo_empleado", "email", "telefono_empleado", "fecha_nacimiento", "sexo", "password_empleado"],
                },
                {
                    model: Spa, // Asegúrate de que el modelo Spa está importado y accesible
                    attributes: ["nombre_spa", "ciudad", "calle", "colonia", "codigo_postal", "telefono"]
                    }, 
            ],
        });
    },

    async getTrabajanEnBySpa(id){
        return await TrabajaEn.findAll({
            where: { id_spa: id },
            include: [
                {
                    model: Empleado,
                    attributes: ["nombre_empleado", "apellido_paterno", "apellido_materno", "tipo_empleado", "email", "telefono_empleado", "fecha_nacimiento", "sexo", "password_empleado"],
                },
                {
                    model: Spa,
                    attributes: ["nombre_spa", "ciudad", "calle", "colonia", "codigo_postal", "telefono"]
                }, 
            ],
        });
    },

    async getTrabajaEnById(id){
        return await TrabajaEn.findOne({ where: { id_empleado: id },
            include: [
                {
                    model: Empleado,
                    attributes: ["nombre_empleado", "apellido_paterno", "apellido_materno", "tipo_empleado", "email", "telefono_empleado", "fecha_nacimiento", "sexo", "password_empleado"],
                },
                {
                    model: Spa, // Asegúrate de que el modelo Spa está importado y accesible
                    attributes: ["nombre_spa", "ciudad", "calle", "colonia", "codigo_postal", "telefono"]
                },
            ],
        })
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
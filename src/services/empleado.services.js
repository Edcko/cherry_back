import { Empleado } from "../models/index.js";

const empleadoService = {

    async getAllEmpleados(){
        return await Empleado.findAll();
    },

    async getEmpleadoById(id){
        return await Empleado.findOne({ where: {id_empleado: id}});
    },

    async createEmpleado(data){
        return await Empleado.create(data);
    },

    async updateEmpleado(id, data){

        const empleado = await Empleado.findOne({ where: {id_empleado: id}});
        if(empleado){
            return await empleado.update(data);
        } else {
            return null;
        }
    },
    
    async deleteEmpleado(id){
        const empleado = await Empleado.findOne({ where: { id_empleado: id}});
        if(empleado) {
            await empleado.destroy();
        }
        return empleado;
    },

}

export { empleadoService };

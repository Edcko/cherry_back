import { Empleado } from "../models/index.js";
import  bcrypt  from "bcrypt"

const empleadoService = {

    async getAllEmpleados(){
        return await Empleado.findAll();
    },

    async getAllEmpleadosActivos(){
        try {
            const empleadosActivos = await Empleado.findAll({
            where: {
                activo: true
            }
            });
            return empleadosActivos;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    async getEmpleadoById(id){
        return await Empleado.findOne({ where: {id_empleado: id}});
    },

    async createEmpleado(data){

        const hashedPassword = await bcrypt.hash(data.password_empleado, 10);
        data.password_empleado = hashedPassword;
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

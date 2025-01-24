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

    async updatePassword(id, newPassword) {
        try {
            // Buscar el empleado por su ID
            const empleado = await Empleado.findOne({ where: { id_empleado: id } });
            if (!empleado) {
                throw new Error(`Empleado con ID ${id} no encontrado`);
            }
    
            // Encriptar la nueva contraseña
            const hashedPassword = await bcrypt.hash(newPassword, 10);
    
            // Actualizar la contraseña del empleado
            empleado.password_empleado = hashedPassword;
            await empleado.save();
    
            return empleado;
        } catch (error) {
            console.error("Error actualizando la contraseña:", error);
            throw error;
        }
    }    

}



export { empleadoService };

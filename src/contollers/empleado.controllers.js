//import { json } from "body-parser";
//import { Empleado } from "../models/Empleado.js";
import { empleadoService } from "../services/empleado.services.js";

const empleadoController = {

async getEmpleados(req, res){
    try{
        const empleados = await empleadoService.getAllEmpleados();
        res.status(200).json(empleados);

    }catch (error){
        console.log(error);
        res.status(500).json({ message: 'Server error'});
    }
},

async getEmpleadoById(req,res){
    const { id } = req.params;

    try{
        const empleado = await empleadoService.getEmpleadoById(id);

        if(!empleado){
            res.status(404).json({ message: `Empleado with id ${id} not found`});
        }else{
            res.status(200).json(empleado);
        }

    }catch (error){
        console.error(error);
        res.status(500).json({ message: `Error retrieving empleado with id ${id}` });
    }
},

async createEmpleado(req,res){
  //  const {id_empleado, nombre_empleado, apellido_paterno, apellido_materno, tipo_empleado, email, telefono_empleado, fecha_nacimiento, sexo} = req.body;

    try{
        const newEmpleado = await empleadoService.createEmpleado(req.body);
        res.status(201).json(newEmpleado);
    }catch (error){
        console.error(error);
        res.status(500).json({ message: 'Error creating empleado'});
    }
},

async updateEmpleado(req, res){
    const { id } = req.params;
//  const { id_empleado, nombre_empleado, apellido_paterno, apellido_materno, tipo_empleado, email, telefono_empleado, fecha_nacimiento, sexo } = req.body;

    try{
        const updatedEmpleado = await empleadoService.updateEmpleado(id, req.body);

        if(!updatedEmpleado){
            res.status(404).json({message: `Empleado with id ${id} not found`});
        }else{
            res.status(200).json(updatedEmpleado);
        }

    }catch(error){
        console.error(error);
        res.status(500).json({ message: `Error updating empleado with id ${id}`});
    }
},

async deleteEmpleado(req, res){
    const { id } = req.params;

    try{
        const deletedEmpleado = await empleadoService.deleteEmpleado(id);

        if(!deletedEmpleado){
            res.status(404).json({ message: `Empleado with id ${id} not found` });
        }else{
            res.status(204).send();
        }

    }catch(error){
        console.error(error);
        res.status(500).json({ message: `Error deleting empleado with id ${id}` });
    }
},

}

export {empleadoController};
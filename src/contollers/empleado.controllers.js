//import { json } from "body-parser";
import { Empleado } from "../models/Empleado.js";

const empleadoController = {

async getEmpleados(req, res){
    try{
        const empleados = await Empleado.findAll();
        res.status(200).json(empleados);

    }catch (error){
        console.log(error);
        res.status(500).json({ message: 'Server error'});
    }
},

async getEmpleadoById(req,res){
    const { id } = req.params;

    try{
        const empleado = await Empleado.findByPk(id);

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
    const {id_empleado, nombre_empleado, apellido_paterno, apellido_materno, tipo_empleado, email, telefono_empleado, fecha_nacimiento, sexo} = req.body;

    try{
        const newEmpleado = await Empleado.create({
            id_empleado, 
            nombre_empleado, 
            apellido_paterno, 
            apellido_materno, 
            tipo_empleado, 
            email, 
            telefono_empleado, 
            fecha_nacimiento, 
            sexo
        });
        res.status(201).json(newEmpleado);
    }catch (error){
        console.error(error);
        res.status(500).json({ message: 'Error creating emplead'});
    }
},

async updateEmpleado(req, res){
    const { id } = req.params;
    const { id_empleado, nombre_empleado, apellido_paterno, apellido_materno, tipo_empleado, email, telefono_empleado, fecha_nacimiento, sexo } = req.body;

    try{
        const empleado = await Empleado.findOne({ where: {id_empleado: id}});

        if(!empleado){
            res.status(404).json({message: `Empleado with id ${id} not found`});
        }else{
            const updatedEmpleado = await empleado.update({
                id_empleado,
                nombre_empleado,
                apellido_paterno,
                apellido_materno,
                tipo_empleado, 
                email, 
                telefono_empleado, 
                fecha_nacimiento, 
                sexo
            });
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
        const empleado = await Empleado.findOne({ where: { id_empleado: id}});

        if(!empleado){
            res.status(404).json({ message: `Empleado with id ${id} not found` });
        }else{
            await empleado.destroy();
            res.status(204).send();
        }

    }catch(error){
        console.error(error);
        res.status(500).json({ message: `Error deleting empleado with id ${id}` });
    }
},

}

export {empleadoController};
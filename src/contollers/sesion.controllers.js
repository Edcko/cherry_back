import { Sesion } from "../models/index.js";
import { sesionService } from "../services/sesion.services.js";

const sesionController = {
    
    async getSesiones(req, res){
        try{
            const sesiones = await sesionService.getAllSesiones();
            res.status(200).json(sesiones);
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },
    
    async getSesionById(req,res){
        const { id } = req.params;

        try{
            const sesion = await sesionService.getSesionById(id);

            if(!sesion){
                res.status(404).json({ message: `Sesion with id ${id} not found`});
            }else{
                res.status(200).json(sesion);
            }

        }catch(error){
            console.error(error);
            res.status(500).json({ message: `Error retrieving sesion with id ${id}` });
        }

    },

    async createSesion(req, res){
  //    const { id_sesion,numero_sesion, descripcion, fecha, fecha_cancelacion } = req.body;
        
        try{
            const newSesion = await sesionService.createSesion(req.body);
            res.status(201).json(newSesion);
        }catch(error){
            console.error(error)
            res.status(500).json({ message: 'Error creating sesion' });
        }

    },

    async updateSesion(req,res){
        const { id } = req.params;
    //  const { id_sesion, numero_sesion, descripcion, fecha,fecha_cancelacion } = req.body;

        try{
            const updatedSesion = await sesionService.updateSesion(id, req.body);

            if(!updatedSesion){
                res.status(404).json({ message: `Sesion with id ${id} not found` });
            }else{
                res.status(200).json(updatedSesion);
            }
        }catch(error){
            console.error(error);
            res.status(500).json({ message: `Error updating sesion with id ${id}` });
        }

    },

    async deleteSesion(req,res){
        const { id } = req.params;

        try{
            const deletedSesion = await sesionService.deleteSesion(id);

            if(!deletedSesion){
                res.status(404).json({ message: `Sesion with id ${id} not found` });
            }else{
                res.status(204).send();
            }

        }catch (error){
            console.error(error);
            res.status(500).json({ message: `Error deleting sesion with id ${id}` });
        }

    }

}

export { sesionController };

/*
create table sesion(
    id_sesion int primary key,
    numero_sesion int,
    descripcion text,
    fecha timestamp not null,
    fecha_cancelacion timestamp
);
*/
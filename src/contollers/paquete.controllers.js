//import { Paquete } from "../models/Paquete.js";
import { paqueteService } from "../services/paquete.services.js";

const paqueteController = {

    async getPaquetes(req, res){
        try{
           const paquetes = await paqueteService.getAllPaquetes(); 
           res.status(200).json(paquetes);
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async getPaqueteById(req,res){
        const { id } = req.params;

        try{
            const paquete = await paqueteService.getPaqueteById(id);

            if(!paquete){
                res.status(404).json({ message: `Paquete with id ${id} not found`});
            }else{
                res.status(200).json(paquete);
            }
            
        }catch(error){
            console.error(error);
            res.status(500).json({ message: `Error retrieving paquete with id ${id}` });
        }

    },

    async createPaquete(req, res){
 // const { id_paquete, nombre_paquete, descripcion, precio, fecha_inicio, fecha_fin, id_empleado } = req.body;

        try{
            const newPaquete = await paqueteService.createPaquete(req.body);
            res.status(201).json(newPaquete);
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Error creating paquete' });
        }

    },

    async updatePaquete(req, res){
        const { id } = req.params;
    //  const { id_paquete, nombre_paquete, descripcion, precio, fecha_inicio, fecha_fin, id_empleado } = req.body;

        try{
            const updatedPaquete = await paqueteService.updatePaquete(id, body.req);

            if(!updatedPaquete){
                res.status(404).json({ message: `Paquete with id ${id} not found` });
            }else{
                res.status(200).json(updatedPaquete);
            }
        }catch(error){
            console.error(error);
            res.status(500).json({ message: `Error updating paquete with id ${id}`});
        }


    },

    async deletePaquete(req, res){
        const{ id } = req.params;

        try{
            const deletedPaquete = await paqueteService.deletePaquete(id);

            if(!deletedPaquete){
                res.status(404).json({ message: `Paquete with id ${id} not found` });
            }else{
                res.status(204).send();
            }

        }catch(error){
            console.error(error);
            res.status(500).json({ message: `Error deleting paquete with id ${id}` });
        }
    },

}


export { paqueteController };
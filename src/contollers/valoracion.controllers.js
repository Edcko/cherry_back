//import { Valoracion } from "../models/Valoracion.js";
import { valoracionService } from "../services/valoracion.services.js";

const valoracionController = {
    async getValoraciones(req, res){
        try{
        const valoraciones = await valoracionService.getAllValoraciones();
        res.status(200).json(valoraciones);
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async getValoracionById(req, res){
        const { id } =  req.params;

        try{
            const valoracion = await valoracionService.getValoracionById(id);

            if(!valoracion){
                res.status(404).json({ message: `Valoracion with id ${id} not found` });
            } else {
                res.status(200).json(valoracion);
            }
        } catch(error){
            console.error(error);
            res.status(500).json({ message: `error retrieving valoracion with id ${id}` });
        }
    },

    async createValoracion(req, res) {
        try {
            const newValoracion = await valoracionService.createValoracion(req.body);
            res.status(201).json(newValoracion);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating valoracion' });
        }
    },

    async updateValoracion(req,res){
        const { id } = req.params;

        try{
            const updatedValoracion = await valoracionService.updateValoracion(id, req.body);

            if(!updatedValoracion){
                res.status(404).json({ message: `Valoracion with id ${id} not found` });
            }else{
                res.status(200).json(updatedValoracion);
            }
        }catch(error){
            console.error(error);
            res.status(500).json({ message: `Error updating valoracion with id ${id}` });
        }
    },

    async deleteValoracion(req,res){
        const { id } = req.params;

        try{
            const deletedValoracion = await valoracionService.deleteValoracion(id);

            if(!deletedValoracion){
                res.status(404).json({ message: `Valoracion with id ${id} not found` });
            }else{
                res.status(204).send();
            }
        }catch(error){
            console.error(error);
            res.status(500).json({ message: `Error deleting valoracion with id ${id}`});
        }
    }
}
export { valoracionController };

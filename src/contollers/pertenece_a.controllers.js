import { perteneceAService } from "../services/pertenece_a.services.js";

const perteneceAController = {

    async getPerteneceA(req,res){
        try{
            const perteneceA = await perteneceAService.getAllPerteneceA();
            res.status(200).json(perteneceA);
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async getPerteneceAById(req,res){
        const { id } = req.params;

        try{
            const perteneceA = await perteneceAService.getPerteneceABySpa(id);

            if(!perteneceA){
                res.status(404).json({ message: `perteceA with id ${id} not found` });
            }else{
                res.status(200).json(perteneceA);
            }

        }catch(error){
            console.error(error);
            res.status(500).json({ message: `Error retrieving spaPaquete with id ${id}` });
        }

    },

    async createPerteceA(req,res){
        try{

            const newSpaPaquete = await perteneceAService.createPerteneceA(req.body);
            res.status(201).json(newSpaPaquete);
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Error creating spaPaquete' });
        }
    },

    async updatePertenceA(req, res){
        const { spaId, paqueteId } = req.params;
    
        try{
            const updatedSpaPaquete = await perteneceAService.updatePerteneceA(spaId, paqueteId, req.body);  
            
            if(!updatedSpaPaquete){
                res.status(404).json({ message: `SpaPaquete with spaId ${spaId} and paqueteId ${paqueteId} not found` });
            } else {
                res.status(200).json(updatedSpaPaquete);
            }
        } catch(error){
            console.error(error);
            res.status(500).json( { message: `Error updating spaPaquete with spaId ${spaId} and paqueteId ${paqueteId}` } );
        }
    },

    async deletePerteneceA(req, res){
        const { spaId, paqueteId } = req.params;
    
        try{
            const deletedSpaPaquete = await perteneceAService.deletePertenceA(spaId, paqueteId);
    
            if(!deletedSpaPaquete){
                res.status(404).json({ message: `SpaPaquete with spaId ${spaId} and paqueteId ${paqueteId} not found` });
            }else{
                res.status(200).json({ message: `SpaPaquete with spaId ${spaId} and paqueteId ${paqueteId} deleted` });
            }
        } catch(error){
            console.error(error);
            res.status(500).json({ message: `Error deleting spaPaquete with spaId ${spaId} and paqueteId ${paqueteId}` });
        }
    },


}

export { perteneceAController };
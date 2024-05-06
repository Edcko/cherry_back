import { TrabajaEn } from "../models/Trabaja_en.js";
import { trabajaEnService } from "../services/trabaja_en.services.js";

const trabajaEnController = {

    async getTrabajanEn(req,res){
        try{
        const trabajanEn = await trabajaEnService.getAllTrabajanEn();
        res.status(200).json(trabajanEn);
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async getTrabajanEnBySpa(req,res){
        const { id } = req.params;

        try{
            const trabajanEn = await trabajaEnService.getTrabajanEnBySpa(id);

            if(!trabajanEn){
                res.status(404).json({ message: `TrabajaEn with spa id ${id} not found` });
            }else{
                res.status(200).json(trabajanEn);
            }

        }catch(error){
            console.error(error);
            res.status(500).json({ message: `Error retrieving trabajaEn with spa id ${id}` });
        }

    },

    async getTrabajaEnById(req,res){
        const { id } = req.params;

        try{
            const trabajaEn = await trabajaEnService.getTrabajaEnById(id);

            if(!trabajaEn){
                res.status(404).json({ message: `TrabajaEn with id ${id} not found` });
            }else{
                res.status(200).json(trabajaEn);
            }

        }catch(error){
            console.error(error);
            res.status(500).json({ message: `Error retrieving sesion with id ${id}` });
        }

    },

    async createTrabajaEn(req, res){
 //  const { id_empleado, id_spa, puesto, salario } = req.body;

        try{
            const newTrabajaEn = await trabajaEnService.createTrabajaEn(req.body);
            res.status(201).json(newTrabajaEn);
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Error creating trabajaEn' });
        }
    },

    async updateTrabajaEn(req,res){
        const { id } = req.params;
    //  const { id_empleado, id_spa, puesto, salario } = req.body;

        try{
            const updatedTrabajaEn = await trabajaEnService.updateTrabajaEn(id,req.body);

            if(!updatedTrabajaEn){
                res.status(404).json({ message: `TrabajaEn with id ${id} not found` });
            }else{
                res.status(200).json(updatedTrabajaEn);
            }
        }catch(error){
            console.error(error);
            res.status(500).json({ message: `Error updating trabajaEn with id ${id}` });  
        }

    },

    async deleteTrabajaEn(req,res){
        const { id } = req.params;
         
        try{
            const deletedTrabajaEn = await trabajaEnService.deleteTrabajaEn(id);

            if(!deletedTrabajaEn){
                res.status(404).json({ message: `TrabaEn with id ${id} not found` });
            }else{
                res.status(204).send();
            }

        }catch(error){
            console.error(error);
            res.status(500).json({ message: `Error deleting trabajaEn with id ${id}` });
        }
        
    }


    


}

export { trabajaEnController };



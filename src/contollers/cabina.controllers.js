import { cabinaService } from "../services/cabina.services.js";

const cabinaController = {

    async getCabinas(req, res){

        try{
            const idSpa = req.query.idSpa;
            if(!idSpa){
                return res.status(400).json({ message: "id_spa parameter is required" });
            }

            const cabinas = await cabinaService.getAllCabinas(idSpa);
            res.status(200).json(cabinas);
        } catch(error){
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }

    },

    async getCabinaById(req,res){
        const { id } = req.params;

        try{

            const cabina = await cabinaService.getCabinaById(id);

            if(!cabina){
                res.status(404).json({ message: `Cabina with id ${id} not found` });
            } else {
                res.status(200).json(cabina);
            }

        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }

    },

    async createCabina(req,res){
        try{

            const newCabina = await cabinaService.createCabina(req.body);
            res.status(201).json(newCabina);
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Error creating cabina' });
        }
    },

    async updateCabina(req, res){

        const { id } = req.params;

        try{
          const updatedCabina = await cabinaService.updateCabina(id, req.body);  
            
          if(!updatedCabina){
            res.status(404).json({ message: `Cabina with id ${id} not found` });
          } else {
            res.status(200).json(updatedCabina);
          }

        } catch(error){
            console.error(error);
            res.status(500).json( { message: `Error updating cabina with id ${id}` } );
        }

    },

    async deleteCabina(req, res){

        const { id } = req.params;

        try{
            const deletedCabina = await cabinaService.deleteCabina(id);

            if(!deletedCabina){
                res.status(404).json({ message: `Cabina with ${id} not found`});
            } else {
                res.status(204).send();
            }

        } catch(error){
            console.error(error);
            res.status(500).json({ message: `Error deleting cabina with id ${id}` });
        }

    },



}

export { cabinaController };
import { Empleado, Spa } from "../models/index.js";
import { spaService } from "../services/spa.services.js";

const spaController = {

async getSpas(req, res){
    try{
        const spas = await spaService.getAllSpas();
        res.status(200).json(spas);
    }catch (error){
        console.log(error);
        res.status(500).json({message: 'Server error'});
    }
},

async getSpaById(req, res){
    const { id } = req.params;

    try{
        const spa = await spaService.getSpaById(id);

        if(!spa){
            res.status(404).json({ message: `Spa with id ${id} not found` });
        }else{
            res.status(200).json(spa);
        }

    }catch (error){
        console.error(error);
        res.status(500).json({ message: `Error retrieving spa with id ${id}`});
        }

},

async createSpa(req,res) {
 //   const {id_spa, nombre_spa, ciudad, calle, colonia, codigo_postal, telefono} = req.body;

    try{
        const newSpa = await spaService.createSpa(req.body);
        res.status(201).json(newSpa);
    }catch (error){
        console.error(error);
        res.status(500).json({ message: 'Error creating spa' });
    }
},

 async updateSpa(req, res){
    const { id } = req.params;
//  const { id_spa, nombre_spa, ciudad, calle, colonia ,codigo_postal, telefono } = req.body;

    try{
        const updatedSpa = await spaService.updateSpa(id, req.body);

        if(!updatedSpa){
            res.status(404).json({ message: `Spa with id ${id} not found` });
        }else{ 
        res.status(200).json(updatedSpa);
        }
    }catch (error){
        console.error(error);
        res.status(500).json({ message: `Error updating spa with id ${id}` });
    }
 },

 async deleteSpa(req, res){
    const { id } = req.params;

    try {
        const deletedSpa = await spaService.deleteSpa(id);

        if(!deletedSpa){
            res.status(404).json({ message: `Spa with id ${id} not found` });
        }else{
            res.status(204).send()
        }
    }catch (error){
        console.error(error);
        res.status(500).json({ message: `Error deleting spa with id ${id}` });
    }
 
 },

 async getEmployeesBySpaId(req,res){
    const { id } = req.params;

    try{
        const spa = await Spa.findByPk(id,{
            include: {
                model: Empleado,
                as: "Empleados",
                through: {
                    attributes: ["puesto", "salario"],
                },
            },
        });

        if(!spa){
            res.status(404).json({ message: `Spa with id {id} not found` });
        }else{
            res.status(200).json(spa.Empleados);
        }

    }catch(error){
        console.error(error);
        res.status(500).json({ message: `Error retrieving employees for spa with id {$id}` });
    }

 },

}

export {spaController};

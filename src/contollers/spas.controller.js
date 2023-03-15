import { Spa } from "../models/Spa.js";

const spaController = {

async getSpas(req, res){
    try{
        const spas = await Spa.findAll();
        res.status(200).json(spas);
    }catch (error){
        console.log(error);
        res.status(500).json({message: 'Server error'});
    }
},

async getSpaById(req, res){
    const { id } = req.params;

    try{
        const spa = await Spa.findByPk(id);

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
    const {id_spa, nombre_spa, ciudad, calle, colonia, codigo_postal, telefono} = req.body;

    try{
        const newSpa = await Spa.create({
            id_spa,
            nombre_spa,
            ciudad,
            calle,
            colonia,
            codigo_postal,
            telefono
        });
        res.status(201).json(newSpa);
    }catch (error){
        console.error(error);
        res.status(500).json({ message: 'Error creating spa' });
    }
},

 async updateSpa(req, res){
    const { id } = req.params;
    const { id_spa, nombre_spa, ciudad, calle, colonia ,codigo_postal, telefono } = req.body;

    try{
        const spa = await Spa.findOne({ where: {id_spa: id}});

        if(!spa){
            res.status(404).json({ message: `Spa with id ${id} not found` });
        }else{
            const updatedSpa = await spa.update({
                id_spa,
                nombre_spa,
                ciudad,
                calle,
                colonia,
                codigo_postal,
                telefono
            });
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
        const spa = await Spa.findOne({ where: {id_spa: id } });

        if(!spa){
            res.status(404).json({ message: `Spa with id ${id} not found` });
        }else{
            await spa.destroy();
            res.status(204).send()
        }
    }catch (error){
        console.error(error);
        res.status(500).json({ message: `Error deleting spa with id ${id}` });
    }
 
 },


}

export {spaController};
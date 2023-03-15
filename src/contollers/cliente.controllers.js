import { Cliente } from "../models/Cliente.js";


const clienteController = {

async getClientes(req, res){

    try{
        const clientes = await Cliente.findAll();
        res.status(200).json(clientes);
    }catch (error){
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }

},

async getClienteById(req, res){
    const { id } = req.params;

    try{
        const cliente = await Cliente.findByPk(id);

        if(!cliente){
            res.status(404).json({ message: `Cliente with id ${id} not found` });
        }else{
            res.status(200).json(cliente);
        }

    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
},

async createCliente(req, res){
    const {id_cliente, nombre_cliente, apellido_paterno, apellido_materno, tipo_cliente, email, telefono_cliente, fecha_nacimiento, sexo, id_spa} = req.body;

    try{
        const newCliente = await Cliente.create({
            id_cliente, 
            nombre_cliente, 
            apellido_paterno, 
            apellido_materno, 
            tipo_cliente, 
            email, 
            telefono_cliente, 
            fecha_nacimiento, 
            sexo, 
            id_spa
        });
        res.status(201).json(newCliente);
    }catch (error){
        console.error(error);
        res.status(500).json({ message: 'Error creating cliente' });
    }
},

async updateCliente(req, res){
    const { id } = req.params;
    const { id_cliente, nombre_cliente, apellido_paterno, apellido_materno, tipo_cliente, email, telefono_cliente, fecha_nacimiento, sexo, id_spa } = req.body;

    try{
        const cliente = await Cliente.findOne({ where: {id_cliente: id} });

        if(!cliente){
            res.status(404).json({ message: `Cliente with id ${id} not found` });
        }else{
            const updatedCliente = await cliente.update({
            id_cliente, 
            nombre_cliente, 
            apellido_paterno, 
            apellido_materno, 
            tipo_cliente, 
            email, 
            telefono_cliente, 
            fecha_nacimiento, 
            sexo, 
            id_spa
            });
            res.status(200).json(updatedCliente);
        }

    }catch(error){
        console.error(error);
        res.status(500).json({ message: `Error updating spa with id ${id}` });
    }
},

async deleteCliente(req, res){
    const { id } = req.params;

    try {
        const cliente = await Cliente.findOne({ where: {id_cliente: id }});

        if(!cliente){
            res.status(404).json({ message: `Cliente with id ${id} not found` });
        }else{
            await cliente.destroy();
            res.status(204).send()
        }
    }catch (error){
        console.error(error);
        res.status(500).json({ message: `Error deleting cliente with id ${id}` });
    }
},



}

export { clienteController };
//import { Cliente } from "../models/Cliente.js";
import { clienteService } from "../services/cliente.services.js";


const clienteController = {

async getClientes(req, res){

    try{
        const idSpa = req.query.idSpa;
        if(!idSpa){
            return res.status(400).json({ message: "id_spa parameter is required" });
        }

        const clientes = await clienteService.getAllClientes(idSpa);
        res.status(200).json(clientes);
    }catch (error){
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }

},

async getClienteById(req, res){
    const { id } = req.params;

    try{
        const cliente = await clienteService.getClienteById(id);

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
//   const {id_cliente, nombre_cliente, apellido_paterno, apellido_materno, tipo_cliente, email, telefono_cliente, fecha_nacimiento, sexo, id_spa} = req.body;

    try{
        const newCliente = await clienteService.createCliente(req.body);
        res.status(201).json(newCliente);
    }catch (error){
        console.error(error);
        res.status(500).json({ message: 'Error creating cliente' });
    }
},

async updateCliente(req, res){
    const { id } = req.params;
//    const { id_cliente, nombre_cliente, apellido_paterno, apellido_materno, tipo_cliente, email, telefono_cliente, fecha_nacimiento, sexo, id_spa } = req.body;

    try{
        const updatedCliente = await clienteService.updateCliente(id,req.body);

        if(!updatedCliente){
            res.status(404).json({ message: `Cliente with id ${id} not found` });
        }else{
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
        const deletedCliente = await clienteService.deleteCliente(id);

        if(!deletedCliente){
            res.status(404).json({ message: `Cliente with id ${id} not found` });
        }else{
            res.status(204).send()
        }
    }catch (error){
        console.error(error);
        res.status(500).json({ message: `Error deleting cliente with id ${id}` });
    }
},

async createClientDocument(req, res) {
    const { id } = req.params;

    try {
    const cliente = await clienteService.getClienteById(id);
    if (!cliente) {
        return res.status(404).json({ message: `Cliente con ID ${id} no encontrado` });
    }

    const filePath = await clienteService.generateClientPDF(cliente);
    res.status(201).json({ message: 'Documento generado', filePath });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al generar el documento' });
    }
},

}

export { clienteController };
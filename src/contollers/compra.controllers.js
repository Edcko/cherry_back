import { compraService } from "../services/compra.services.js";

const compraController = {

    async getCompras(req, res){
        try{
        const compras = await compraService.getAllCompras();
        res.status(200).json(compras);
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async getCompraById(req, res){
        const { id } =  req.params;

        try{
            const compra = await compraService.getCompraById(id);

            if(!compra){
                res.status(404).json({ message: `Compra with id ${id} not found` });
            } else {
                res.status(200).json(compra);
            }
        } catch(error){
            console.error(error);
            res.status(500).json({ message: `Error retrieving compra with id ${id}` });
        }
    },

    
    async createCompra(req, res){
        try{
            const newCompra = await compraService.createCompra(req.body);
            res.status(201).json(newCompra);
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Error creating compra' });
        }
    },

    async updateCompra(req,res){
        const { id } = req.params;

        try{
            const updatedCompra = await compraService.updateCompra(id, req.body);

            if(!updatedCompra){
                res.status(404).json({ message: `Compra with id ${id} not found` });
            }else{
                res.status(200).json(updatedCompra);
            }
        }catch(error){
            console.error(error);
            res.status(500).json({ message: `Error updating compra with id ${id}` });
        }
    },

    async deleteCompra(req,res){
        const { id } = req.params;

        try{
            const deletedCompra = await compraService.deleteCompra(id);

            if(!deletedCompra){
                res.status(404).json({ message: `Compra with id ${id} not found` });
            }else{
                res.status(204).send();
            }

        }catch(error){
            console.error(error);
            res.status(500).json({ message: `Error deleting compra with id ${id}`});
        }
    },

    async comprasByClienteId(req,res){
        
        try{
        const clienteId = req.params.id;
        const compras = await compraService.getComprasByClienteId(clienteId);
        res.status(200).json(compras);
        } catch(error){
            console.error(error);
            res.status(500).json({ message: `Server error` });
        }
    },

    async comprasByPaqueteId(req,res){

        try{
        const paqueteId = req.params.id;
        const compras = await compraService.getComprasByPaqueteId(paqueteId);
        res.status(200).json(compras);
        }catch(error){
            console.error(error);
            res.status(500).json({ message: `Server error` });
        }
    },

    async clienteByCompraIds(req, res){
        
        try{
            const { clienteId, paqueteId } = req.params;
            const cliente = await compraService.getClienteByCompraIds(clienteId, paqueteId);
            res.status(200).json(cliente);
        }catch(error){
            console.error(error);
            res.status(500).json({ message: `Server error` });
        }
    },

    async paqueteByCompraIds(req, res){

        try{

            const { clienteId, paqueteId } = req.params;
            const paquete = await compraService.getPaqueteByCompraIds(clienteId, paqueteId);
            res.status(200).json(paquete);
        }catch(error){
            console.error(error);
            res.status(500).json({ message: `Server error` });
        }

    },

}

export { compraController };

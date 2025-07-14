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

    async getCompraCompleta(req, res){
        const { id } = req.params;

        try{
            const compra = await compraService.getCompraCompletaById(id);

            if(!compra){
                res.status(404).json({ message: `Compra with id ${id} not found` });
            } else {
                res.status(200).json(compra);
            }
        } catch(error){
            console.error(error);
            res.status(500).json({ message: `Error retrieving complete compra with id ${id}` });
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
    // controllers/compra.controllers.js
 async getVentasPorRango(req, res) {
    try {
      const { inicio, fin } = req.query;
      if (!inicio || !fin) {
        return res.status(400).json({ message: "Debes enviar inicio y fin en query params" });
      }

      const agregados = await compraService.getVentasPorRango(inicio, fin);
      res.status(200).json(agregados);
    } catch (e) {
      console.error("Error en getVentasPorRango:", e);
      res.status(500).json({ message: "Error al obtener totales de ventas" });
    }
  },

   async getVentasDetallePorRango(req, res) {
    try {
      const { inicio, fin } = req.query;
      if (!inicio || !fin) {
        return res.status(400).json({ message: "Debes enviar inicio y fin en query params" });
      }

      const detalle = await compraService.getVentasDetallePorRango(inicio, fin);
      res.status(200).json(detalle);
    } catch (e) {
      console.error("Error en getVentasDetallePorRango:", e);
      res.status(500).json({ message: "Error al obtener detalle diario de ventas" });
    }
  },

  async getVentasDetalleConCompradores(req, res) {
    try {
      const { inicio, fin } = req.query;
      if (!inicio || !fin) {
        return res.status(400).json({ message: "Debes enviar inicio y fin en query params" });
      }

      const detalle = await compraService.getVentasDetalleConCompradores(inicio, fin);
      res.status(200).json(detalle);
    } catch (e) {
      console.error("Error en getVentasDetalleConCompradores:", e);
      res.status(500).json({ message: "Error al obtener detalle de ventas con compradores" });
    }
  },

}

export { compraController };

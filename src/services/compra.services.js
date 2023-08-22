import { Compra, Cliente, Paquete } from "../models/index.js";
import { Op } from "sequelize";

const compraService = {
    
    async getAllCompras(){
        return await Compra.findAll({
            include: [
                {
                    model: Cliente,
                    attributes: ["nombre_cliente", "apellido_paterno", "apellido_materno"],
                },
                {
                   model: Paquete,
                   attributes: ["nombre_paquete"],
                }
            ],
        });
    },

    async getCompraByIds(clienteId, paqueteId){
        return await Compra.findOne({ where: { id_cliente: clienteId, id_paquete: paqueteId } });
    },

    async createCompra(data){
        return await Compra.create(data);
    },

    async updateCompra(clienteId, paqueteId, data){
        const compra = await Compra.findOne({ where: { id_cliente: clienteId, id_paquete: paqueteId } });
        if(compra){
            return await compra.update(data);
        } else {
            return null;
        }
    },

    async deleteCompra(clienteId, paqueteId){
        const compra = await Compra.findOne({ where: { id_cliente: clienteId, id_paquete: paqueteId } });
        if(compra){
            await compra.destroy();
        }
        return compra;
    },

    async getComprasByClienteId(clienteId){
        return await Compra.findAll({ where: { id_cliente: clienteId } });
    },

    async getComprasByPaqueteId(paqueteId){
        return await Compra.findAll({ where: { id_paquete: paqueteId } });
    },

    async getClienteByCompraIds(clienteId, paqueteId){
        return await Cliente.findOne({
            include: { model: Compra, where: { id_cliente: clienteId, id_paquete: paqueteId } },
        });
    },

    async getPaqueteByCompraIds(clienteId, paqueteId){
        return await Paquete.findOne({
            include: { model: Compra, where: { id_cliente: clienteId, id_paquete: paqueteId } },
        });
    },
}

export { compraService };

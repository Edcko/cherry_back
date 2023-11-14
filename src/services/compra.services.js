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
                   attributes: ["nombre_paquete", "precio"],
                }
            ],
        });
    },

    async getCompraById(id){
        return await Compra.findByPk(id);
    },

    async createCompra(data){
        return await Compra.create(data);
    },

    async updateCompra(id, data){
        const compra = await Compra.findOne({ where: { id_compra: id } });
        if(compra){
            return await compra.update(data);
        } else {
            return null;
        }
    },

    async deleteCompra(id){
        const compra = await Compra.findOne({ where: { id_compra: id } });
        if(compra){
            await compra.destroy();
        }
        return compra;
    },     
}

export { compraService };

import { Cliente, Spa } from "../models/index.js";

const clienteService = {

   async getAllClientes(idSpa) {
        return await Cliente.findAll({
            where: {id_spa: idSpa},
            include: [{
                model: Spa,
                attributes: ["nombre_spa", "ciudad", "calle", "colonia", "codigo_postal", "telefono"],
            }],
        });
    },

   async getClienteById(id){
        return  await Cliente.findOne({ where: {id_cliente: id}});
    },

    async createCliente(data){
        return await Cliente.create(data);
    },

    async updateCliente(id, data){

        const cliente = await Cliente.findOne({ where: {id_cliente: id} });
        if(cliente){
            return await cliente.update(data);
        } else {
            return null;
        }
    },
    
    async deleteCliente(id){
        const cliente = await Cliente.findOne({ where: {id_cliente: id} });
        if(cliente){
            await cliente.destroy();
        }
            return cliente;
    },

    

}

export { clienteService };
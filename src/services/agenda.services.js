import { Agenda, Empleado, Cliente, Cabina, Sesion, Paquete } from "../models/index.js";
import { Op } from "sequelize";

const agendaService = {
    
    async getAllCitas(){
        return await Agenda.findAll({
            include: [
                {
                    model: Empleado,
                    attributes: ["nombre_empleado", "apellido_paterno", "apellido_materno"],
                },
                {
                    model: Cliente,
                    attributes: ["nombre_cliente", "apellido_paterno", "apellido_materno"],
                },
                {
                    model: Cabina,
                    attributes: ["numero_cabina","turno","estado_cabina"],
                    include: [{
                        model: Empleado,
                        attributes: ["nombre_empleado", "apellido_paterno", "apellido_materno"],
                    }],
                },
                {
                   model: Paquete,
                   attributes: ["nombre_paquete"],
                },
                {
                    model: Sesion,
                    attributes: ["descripcion"],
                },
            ],
        });
    },

    async getCitaById(id){
        return await Agenda.findByPk(id);
    },

    async createCita(data){
        return await Agenda.create(data);
    },

    async updateCita(id, data){
        
        const cita = await Agenda.findOne({ where: { id_cita: id } });
        if(cita){
            return await cita.update(data);
        } else {
            return null;
        }
    },

    async deleteCita(id){

        const cita = await Agenda.findOne({ where: { id_cita: id } });
        if(cita){
            await cita.destroy();
        }
        return cita;
    },


    async getCitasByEmpleadoId(empleadoId){
        return await Agenda.findAll({ where: { id_empleado: empleadoId } });
    },

    async getCitasByCabinaId(cabinaId){
        return await Agenda.findAll({ where: { id_cabina: cabinaId } });
    },

    async getEmpleadoByCitaId(citaId){
        return await Empleado.findOne({
          include:{ model: Agenda, where: { id_cita: citaId } },  
        });
    },

    async getCabinaByCitaId(citaId){
        return await Cabina.findOne({
            include: { model: Agenda, where: { id_cita: citaId } },
        });
    },

    async getCitasByClienteId(clienteId){
        return await Agenda.findAll({ where: { id_cliente: clienteId } });
    },

    async getCitasBySesionId(sesionId){
        return await Agenda.findAll({ where: { id_sesion: sesionId } });
    },

    async getCitasByDateRange(startDate, endDate){
        return await Agenda.findAll({
            where: {
                fecha: {
                    [Op.between]: [startDate, endDate]
                }
            },
            include: [
                {
                    model: Empleado,
                    attributes: ["nombre_empleado", "apellido_paterno", "apellido_materno"],
                },
                {
                    model: Cliente,
                    attributes: ["nombre_cliente", "apellido_paterno", "apellido_materno"],
                },
                {
                    model: Cabina,
                    attributes: ["numero_cabina", "turno", "estado_cabina"],
                    include: [{
                        model: Empleado,
                        attributes: ["nombre_empleado", "apellido_paterno", "apellido_materno"],
                    }],
                },
                {
                    model: Paquete,
                    attributes: ["nombre_paquete"],
                },
                {
                    model: Sesion,
                    attributes: ["descripcion"],
                },
            ],
        });
    }
    

}

export { agendaService };
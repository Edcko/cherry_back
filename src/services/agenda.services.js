import { Agenda, Empleado, Cliente, Cabina, Sesion, Paquete, Spa } from "../models/index.js";
import { Sequelize, Op } from "sequelize";

const agendaService = {
    
    async getAllCitas(idSpa){
        return await Agenda.findAll({
            where: { id_spa: idSpa},
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
                {
                    model: Spa,
                    attributes: ["nombre_spa", "ciudad", "calle", "colonia", "codigo_postal", "telefono"],
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

    async getCitasByClienteNombre(nombre_cliente) {
      return await Agenda.findAll({
        include: [{
            model: Cliente,
            where: { nombre_cliente: nombre_cliente }
        }]
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

    async getCitasByDateRange(idSpa, startDate, endDate){
        return await Agenda.findAll({
            where: {
                id_spa: idSpa,  // Asegurando que solo se recuperen citas del spa correcto
                fecha: {
                    [Op.between]: [startDate, endDate] // Filtrando por rango de fechas
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
                {
                    model: Spa,
                    attributes: ["nombre_spa", "ciudad", "calle", "colonia", "codigo_postal", "telefono"],
                },    
            ],
        });
    },

    async getCitasByDate(fecha){
        const startOfDay = new Date(fecha);
        startOfDay.setHours(0, 0, 0, 0); // Establece la hora al inicio del día
    
        const endOfDay = new Date(fecha);
        endOfDay.setHours(23, 59, 59, 999); // Establece la hora al final del día
    

        return await Agenda.findAll({
            where: {
                fecha: fecha
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
    },

    async getCitasCountByDateRange(idSpa, startDate, endDate) {
        return await Agenda.findAll({
            attributes: [
                [Sequelize.fn("DATE", Sequelize.col("fecha")), "fecha"], // Agrupar por fecha
                [Sequelize.fn("COUNT", "*"), "count"] // Contar citas por fecha
            ],
            where: {
                id_spa: idSpa,
                fecha: {
                    [Op.between]: [startDate, endDate]
                },
                estado: { // Excluir los estados específicos
                    [Op.notIn]: ["Reagendo cita", "Cita cancelada"]
                }
            },
            group: [Sequelize.fn("DATE", Sequelize.col("fecha"))], // Agrupar por la fecha (ignorar horas)
            order: [[Sequelize.fn("DATE", Sequelize.col("fecha")), "ASC"]]
        });
    },
    
    async reagendarCita(idCitaOriginal, nuevaFecha) {
        try {
            // Buscar la cita original
            const citaOriginal = await Agenda.findOne({ 
                where: { id_cita: idCitaOriginal },
                include: [
                    { model: Empleado },
                    { model: Cliente },
                    { model: Cabina },
                    { model: Paquete },
                    { model: Sesion },
                    { model: Spa }
                ]
            });
    
            if (!citaOriginal) {
                throw new Error(`Cita con ID ${idCitaOriginal} no encontrada`);
            }
    
            // Actualizar el estado de la cita original a "Reagendada"
            await citaOriginal.update({ estado: "Reagendada" });
    
            // Crear una nueva cita con la nueva fecha
            const nuevaCita = await Agenda.create({
                id_empleado: citaOriginal.id_empleado,
                id_cabina: citaOriginal.id_cabina,
                id_cliente: citaOriginal.id_cliente,
                id_sesion: citaOriginal.id_sesion,
                id_spa: citaOriginal.id_spa,
                fecha: nuevaFecha,
                estado: "Por confirmar",
                id_paquete: citaOriginal.id_paquete,
                numero_visita: citaOriginal.numero_visita + 1,
                tipo_cita: citaOriginal.tipo_cita,
                id_cita_origen: citaOriginal.id_cita // Relación con la cita original
            });
    
            return { citaOriginal, nuevaCita };
        } catch (error) {
            console.error("Error en reagendarCita:", error);
            throw error;
        }
    },
    

}

export { agendaService };
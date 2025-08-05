import { Agenda } from "../models/Agenda.js";
import { Cabina } from "../models/Cabina.js";
import { agendaService } from "../services/agenda.services.js";
import { Op } from "sequelize";


const agendaController = {

    async getCitas(req, res) {
        try {
            const idSpa = req.query.idSpa;  // Extraer id_spa del query
    
            if (!idSpa) {
                return res.status(400).json({ message: "id_spa parameter is required" });
            }
    
            const { startDate, endDate } = req.query;
            const citas = startDate && endDate 
                ? await agendaService.getCitasByDateRange(idSpa, startDate, endDate)
                : await agendaService.getAllCitas(idSpa);
    
            res.status(200).json(citas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },
    
    async getCitaById(req, res){
        const { id } =  req.params;

        try{
            const cita = await agendaService.getCitaById(id);

            if(!cita){
                res.status(404).json({ message: `Cita with id ${id} not found` });
            } else {
                res.status(200).json(cita);
            }
        } catch(error){
            console.error(error);
            res.status(500).json({ message: `error retrieving sesion with ida ${id}` });
        }
    },

    async createCita(req, res) {
        try {
            const { fecha, id_cabina, id_spa } = req.body;
    
            // Obtener el número de cabina de la cabina seleccionada
            const cabinaSelected = await Cabina.findOne({ where: { id_cabina: id_cabina } });
            const { numero_cabina } = cabinaSelected;
    
            // Verificar si ya existe una cita con la misma fecha y número de cabina, sin considerar el turno
            const existingCita = await Agenda.findOne({
                include: [{
                    model: Cabina,
                    where: {
                        numero_cabina: numero_cabina,
                        id_spa: id_spa,
                    }
                }],
                where: {
                    fecha: fecha,
                    estado: { [Op.notIn]: ["Reagendo cita", "Cita cancelada"] } // Excluir estados no relevantes
                }
            });
    
            if (existingCita) {
                return res.status(400).json({ message: 'Ya existe una cita agendada para esa fecha y número de cabina.' });
            }
    
            const newCita = await agendaService.createCita(req.body);
            res.status(201).json(newCita);
        } catch (error) {
            console.error(error);
            
            // Manejar errores específicos de validación de sesiones
            if (error.message === 'El paquete no tiene sesiones disponibles') {
                return res.status(400).json({ 
                    message: 'No se puede crear la cita: el paquete no tiene sesiones disponibles' 
                });
            }
            
            res.status(500).json({ message: 'Error creating cita' });
        }
    },    
    
    

    async updateCita(req,res){
        const { id } = req.params;

        try{
            const updatedCita = await agendaService.updateCita(id, req.body);

            if(!updatedCita){
                res.status(404).json({ message: `Cita with id ${id} not found` });
            }else{
                res.status(200).json(updatedCita);
            }
        }catch(error){
            console.error(error);
            res.status(500).json({ message: `Error updating cita with id ${id}` });
        }
    },

    async deleteCita(req,res){
        const { id } = req.params;

        try{
            const deletedCita = await agendaService.deleteCita(id);

            if(!deletedCita){
                res.status(404).json({ message: `Cita with id ${id} not found` });
            }else{
                res.status(204).send();
            }

        }catch(error){
            console.error(error);
            res.status(500).json({ message: `Error deleting cita with id ${id}`});
        }

    },

    async citasByEmpleado(req,res){
        
        try{
        const empleadoId = req.params.id;
        const citas = await agendaService.getCitasByEmpleadoId(empleadoId);
        res.status(200).json(citas);
        } catch(error){
            console.error(error);
            res.status(500).json({ message: `Server error` });
        }
    },

    async citasByCabina(req, res){
        
        try{
        const cabinaId = req.params.id;
        const citas = await agendaService.getCitasByCabinaId(cabinaId);
        res.status(200).json(citas);
        }catch(error){
            console.error(error);
            res.status(500).json({ message: `Server error` });
        }
    },

    async empleadoByCita(req, res){
        
        try{
            const citaId = req.params.id
            const empleado = await agendaService.getEmpleadoByCitaId(citaId);
            res.status(200).json(empleado);
        }catch(error){
            console.error(error);
            res.status(500).json({ message: `Server error` });
        }
    },

    async citasByClienteNombre(req, res){
        try{
            const nombreCliente = req.params.nombre;
            const citas = await agendaService.getCitasByClienteNombre(nombreCliente);
            res.status(200).json(citas);
        }catch(error){
            console.error(error);
            res.status(500).json({ message: `Server error` });
    }
},

    async cabinaByCita(req, res){

        try{

            const citaId = req.params.id;
            const cabina = await agendaService.getCabinaByCitaId(citaId);
            res.status(200).json(cabina);
        }catch(error){
            console.error(error);
            res.status(500).json({ message: `Server error` });
        }

    },

    async citasByCliente(req,res){

        try{
        const clienteId = req.params.id;
        const citas = await agendaService.getCitasByClienteId(clienteId);
        res.status(200).json(citas);
        } catch(error){
            console.error(error);
            res.status(500).json({ message: `Server error` });
        }
    },

    async citasBySesion(req,res){

        try{
        const sesionId = req.params.id;
        const citas = await agendaService.getCitasBySesionId(sesionId);
        res.status(200).json(citas);
        }catch(error){
            console.error(error);
            res.status(500).json({ message: `Server error` });
        }
    },

    async citasByDateRange(req,res){
        const {startDate, endDate} = req.query;
        const citas = await agendaService.getCitasByDateRange(startDate, endDate);
        res.status(200).json(citas);
    },

    async citasByDate(req,res){
        const { fecha } = req.query;
    console.log(fecha);
    
    // Convertir fecha a objetos Date
    const startDate = new Date(fecha);
    startDate.setUTCHours(0, 0, 0, 0); // Establecer a las 00:00:00 UTC
    startDate.setDate(startDate.getDate() + 1); // Sumar un día a la fecha de inicio

    
    const endDate = new Date(fecha);
    endDate.setUTCHours(23, 59, 59, 999); // Establecer a las 23:59:59 UTC
    
    // Formatear manualmente las fechas como cadenas en el formato deseado (YYYY-MM-DD HH:MM:SS)
    const startDateString = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')} 00:00:00`;
    const endDateString = `${endDate.getFullYear()}-${(endDate.getMonth() + 1).toString().padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')} 23:59:59`;
    
    console.log('1.-', startDateString);
    console.log(endDateString);
    
    // Llamar al servicio con las cadenas de fecha formateadas manualmente
    const citas = await agendaService.getCitasByDateRange(startDateString, endDateString);
    res.status(200).json(citas);
    },

    async getCitasCountByDateRange(req, res) {
        try {
            const idSpa = req.query.idSpa; // id del spa
            const { startDate, endDate } = req.query;
    
            if (!idSpa || !startDate || !endDate) {
                return res.status(400).json({ message: "idSpa, startDate, and endDate are required." });
            }
    
            const citasCount = await agendaService.getCitasCountByDateRange(idSpa, startDate, endDate);
            res.status(200).json(citasCount);
        } catch (error) {
            console.error("Error fetching citas count:", error);
            res.status(500).json({ message: "Server error while fetching citas count." });
        }
    },    

    async reagendarCita(req, res) {
        try {
            const { idCitaOriginal, nuevaFecha } = req.body;
    
            if (!idCitaOriginal || !nuevaFecha) {
                return res.status(400).json({
                    message: "Se requiere el ID de la cita original y la nueva fecha."
                });
            }
    
            const { citaOriginal, nuevaCita } = await agendaService.reagendarCita(idCitaOriginal, nuevaFecha);
    
            res.status(200).json({
                message: "Cita reagendada exitosamente.",
                citaOriginal,
                nuevaCita
            });
        } catch (error) {
            console.error("Error en reagendarCita:", error);
            res.status(500).json({ message: "Error al reagendar la cita." });
        }
    },
    
}

export { agendaController };

import { Agenda } from "../models/Agenda.js";
import { Cabina } from "../models/Cabina.js";
import { agendaService } from "../services/agenda.services.js";


const agendaController = {

    async getCitas(req, res){
        try{
        const citas = await agendaService.getAllCitas();
        res.status(200).json(citas);
        }catch(error){
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
            const { fecha, id_cabina } = req.body;
    
            // Obtener el número de cabina de la cabina seleccionada
            const cabinaSelected = await Cabina.findOne({ where: { id_cabina: id_cabina } });
            const { numero_cabina } = cabinaSelected;
    
            // Verificar si ya existe una cita con la misma fecha y número de cabina, sin considerar el turno
            const existingCita = await Agenda.findOne({
                include: [{
                    model: Cabina,
                    where: {
                        numero_cabina: numero_cabina
                    }
                }],
                where: {
                    fecha: fecha
                }
            });
    
            if (existingCita) {
                return res.status(400).json({ message: 'Ya existe una cita agendada para esa fecha y número de cabina.' });
            }
    
            const newCita = await agendaService.createCita(req.body);
            res.status(201).json(newCita);
        } catch (error) {
            console.error(error);
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

    
}

export { agendaController };

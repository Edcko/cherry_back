import { clientePaqueteSesionesService } from "../services/cliente_paquete_sesiones.services.js";

const clientePaqueteSesionesController = {

    // Obtener todas las sesiones de un cliente
    async getSesionesByCliente(req, res) {
        const { idCliente } = req.params;
        
        try {
            const sesiones = await clientePaqueteSesionesService.getSesionesByCliente(idCliente);
            res.status(200).json(sesiones);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error obteniendo sesiones del cliente' });
        }
    },

    // Obtener sesiones específicas de un cliente para un paquete
    async getSesionesByClienteAndPaquete(req, res) {
        const { idCliente, idPaquete } = req.params;
        
        try {
            const sesiones = await clientePaqueteSesionesService.getSesionesByClienteAndPaquete(idCliente, idPaquete);
            
            if (!sesiones) {
                return res.status(404).json({ 
                    message: 'No se encontraron sesiones para este cliente y paquete' 
                });
            }
            
            res.status(200).json(sesiones);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error obteniendo sesiones del cliente para el paquete' });
        }
    },

    // Validar si un cliente puede agendar una cita
    async validarSesionesDisponibles(req, res) {
        const { idCliente, idPaquete } = req.params;
        
        try {
            const validacion = await clientePaqueteSesionesService.validarSesionesDisponibles(idCliente, idPaquete);
            res.status(200).json(validacion);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error validando sesiones disponibles' });
        }
    },

    // Obtener paquetes con sesiones disponibles por cliente
    async getPaquetesConSesionesDisponibles(req, res) {
        const { idCliente } = req.params;
        
        try {
            const paquetes = await clientePaqueteSesionesService.getPaquetesConSesionesDisponibles(idCliente);
            res.status(200).json(paquetes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error obteniendo paquetes con sesiones disponibles' });
        }
    },

    // Crear un nuevo registro de sesiones (cuando un cliente compra un paquete)
    async crearSesionesCliente(req, res) {
        try {
            const nuevaSesion = await clientePaqueteSesionesService.crearSesionesCliente(req.body);
            res.status(201).json(nuevaSesion);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creando sesiones del cliente' });
        }
    },

    // Obtener estadísticas de sesiones de un cliente
    async getEstadisticasCliente(req, res) {
        const { idCliente } = req.params;
        
        try {
            const estadisticas = await clientePaqueteSesionesService.getEstadisticasCliente(idCliente);
            res.status(200).json(estadisticas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error obteniendo estadísticas del cliente' });
        }
    }
};

export { clientePaqueteSesionesController }; 
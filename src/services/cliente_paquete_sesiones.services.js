import { ClientePaqueteSesiones, Cliente, Paquete } from "../models/index.js";
import { db } from "../config/database.js";

const clientePaqueteSesionesService = {

    // Obtener todas las sesiones de un cliente
    async getSesionesByCliente(idCliente) {
        return await ClientePaqueteSesiones.findAll({
            where: { id_cliente: idCliente },
            include: [
                {
                    model: Paquete,
                    attributes: ["nombre_paquete", "descripcion", "precio", "imagen_paquete"]
                }
            ],
            order: [['fecha_compra', 'DESC']]
        });
    },

    // Obtener sesiones específicas de un cliente para un paquete
    async getSesionesByClienteAndPaquete(idCliente, idPaquete) {
        return await ClientePaqueteSesiones.findOne({
            where: { 
                id_cliente: idCliente,
                id_paquete: idPaquete
            },
            include: [
                {
                    model: Paquete,
                    attributes: ["nombre_paquete", "descripcion", "precio", "imagen_paquete"]
                }
            ]
        });
    },

    // Validar si un cliente puede agendar una cita (tiene sesiones disponibles)
    async validarSesionesDisponibles(idCliente, idPaquete) {
        const sesiones = await ClientePaqueteSesiones.findOne({
            where: { 
                id_cliente: idCliente,
                id_paquete: idPaquete,
                estado: 'Activo'
            }
        });

        if (!sesiones) {
            return {
                puedeAgendar: false,
                mensaje: 'No tienes este paquete comprado o está inactivo'
            };
        }

        if (sesiones.sesiones_restantes <= 0) {
            return {
                puedeAgendar: false,
                mensaje: 'No tienes sesiones disponibles en este paquete'
            };
        }

        return {
            puedeAgendar: true,
            sesionesRestantes: sesiones.sesiones_restantes,
            mensaje: `Tienes ${sesiones.sesiones_restantes} sesiones disponibles`
        };
    },

    // Obtener paquetes con sesiones disponibles por cliente
    async getPaquetesConSesionesDisponibles(idCliente) {
        return await ClientePaqueteSesiones.findAll({
            where: { 
                id_cliente: idCliente,
                sesiones_restantes: {
                    [db.Sequelize.Op.gt]: 0
                },
                estado: 'Activo'
            },
            include: [
                {
                    model: Paquete,
                    attributes: ["nombre_paquete", "descripcion", "precio", "imagen_paquete"]
                }
            ],
            order: [['fecha_compra', 'DESC']]
        });
    },

    // Crear un nuevo registro de sesiones (cuando un cliente compra un paquete)
    async crearSesionesCliente(data) {
        const { id_cliente, id_paquete, sesiones_compradas } = data;
        
        // Obtener el paquete para verificar el número de visitas
        const paquete = await Paquete.findByPk(id_paquete);
        if (!paquete) {
            throw new Error('Paquete no encontrado');
        }

        // Verificar si ya existe un registro para este cliente y paquete
        const sesionesExistentes = await ClientePaqueteSesiones.findOne({
            where: { id_cliente, id_paquete }
        });

        if (sesionesExistentes) {
            // Actualizar sesiones existentes
            return await sesionesExistentes.update({
                sesiones_compradas: sesionesExistentes.sesiones_compradas + sesiones_compradas,
                sesiones_restantes: sesionesExistentes.sesiones_restantes + sesiones_compradas,
                estado: 'Activo'
            });
        }

        // Crear nuevo registro
        return await ClientePaqueteSesiones.create({
            id_cliente,
            id_paquete,
            sesiones_compradas,
            sesiones_restantes: sesiones_compradas,
            fecha_compra: new Date(),
            estado: 'Activo'
        });
    },

    // Actualizar sesiones (usado por los triggers)
    async actualizarSesiones(idCliente, idPaquete, sesionesUsadas, sesionesRestantes) {
        return await ClientePaqueteSesiones.update({
            sesiones_usadas: sesionesUsadas,
            sesiones_restantes: sesionesRestantes,
            estado: sesionesRestantes <= 0 ? 'Agotado' : 'Activo'
        }, {
            where: { id_cliente, id_paquete }
        });
    },

    // Obtener estadísticas de sesiones de un cliente
    async getEstadisticasCliente(idCliente) {
        const sesiones = await ClientePaqueteSesiones.findAll({
            where: { id_cliente },
            include: [
                {
                    model: Paquete,
                    attributes: ["nombre_paquete"]
                }
            ]
        });

        const totalSesionesCompradas = sesiones.reduce((sum, s) => sum + s.sesiones_compradas, 0);
        const totalSesionesUsadas = sesiones.reduce((sum, s) => sum + s.sesiones_usadas, 0);
        const totalSesionesRestantes = sesiones.reduce((sum, s) => sum + s.sesiones_restantes, 0);

        return {
            totalSesionesCompradas,
            totalSesionesUsadas,
            totalSesionesRestantes,
            paquetesActivos: sesiones.filter(s => s.estado === 'Activo').length,
            paquetesAgotados: sesiones.filter(s => s.estado === 'Agotado').length,
            detalles: sesiones
        };
    }
};

export { clientePaqueteSesionesService }; 
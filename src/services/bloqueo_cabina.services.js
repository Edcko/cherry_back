// services/bloqueo.services.js
import { BloqueoCabina } from "../models/Bloqueo_cabina.js";
import { Cabina } from "../models/Cabina.js";
import { Spa } from "../models/Spa.js";
import { Op } from "sequelize";

const bloqueoService = {
  async getAllBloqueos(idSpa) {
    return await BloqueoCabina.findAll({
      where: { id_spa: idSpa },
      include: [
        { model: Cabina, attributes: ["id_cabina", "numero_cabina", "estado_cabina"] },
        { model: Spa, attributes: ["id_spa", "nombre_spa", "ciudad"] },
      ],
      order: [["fecha_bloqueo", "ASC"]],
    });
  },

  async createBloqueo(data) {
    // Aquí podrías agregar validaciones como verificar si ya existe un bloqueo en ese horario.
    return await BloqueoCabina.create(data);
  },

  async updateBloqueo(id, data) {
    const bloqueo = await BloqueoCabina.findByPk(id);
    if (bloqueo) {
      return await bloqueo.update(data);
    }
    return null;
  },

  async deleteBloqueo(id) {
    const bloqueo = await BloqueoCabina.findByPk(id);
    if (bloqueo) {
      await bloqueo.destroy();
    }
    return bloqueo;
  },

   // Nueva función para obtener bloqueos por spa y rango de fechas
   async getBloqueosByDateRange(idSpa, startDate, endDate) {
    return await BloqueoCabina.findAll({
      where: {
        id_spa: idSpa, // Filtrar por spa
        fecha_bloqueo: {
          [Op.between]: [startDate, endDate] // Rango de fechas
        }
      },
      include: [
        { model: Cabina, attributes: ["id_cabina", "numero_cabina", "estado_cabina"] },
        { model: Spa, attributes: ["id_spa", "nombre_spa", "ciudad"] },
      ],
      order: [["fecha_bloqueo", "ASC"]],
    });
  },
  
};

export { bloqueoService };

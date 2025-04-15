// controllers/bloqueoCabina.controller.js
import { bloqueoService } from "../services/bloqueo_cabina.services.js";

const bloqueoCabinaController = {
  async getBloqueos(req, res) {
    try {
      const { idSpa } = req.query;
      if (!idSpa) return res.status(400).json({ message: "El parámetro idSpa es requerido." });
      const bloqueos = await bloqueoService.getAllBloqueos(idSpa);
      return res.status(200).json(bloqueos);
    } catch (error) {
      console.error("Error al obtener bloqueos:", error);
      return res.status(500).json({ message: "Error en el servidor." });
    }
  },

  async createBloqueo(req, res) {
    try {
      const { id_cabina, id_spa, fecha_bloqueo, motivo } = req.body;
      if (!id_cabina || !id_spa || !fecha_bloqueo) {
        return res.status(400).json({ message: "id_cabina, id_spa y fecha_bloqueo son obligatorios." });
      }
      const bloqueo = await bloqueoService.createBloqueo({ id_cabina, id_spa, fecha_bloqueo, motivo });
      return res.status(201).json(bloqueo);
    } catch (error) {
      console.error("Error al crear bloqueo:", error);
      return res.status(500).json({ message: "Error al crear el bloqueo." });
    }
  },

  async updateBloqueo(req, res) {
    try {
      const { id } = req.params;
      const updated = await bloqueoService.updateBloqueo(id, req.body);
      if (!updated) return res.status(404).json({ message: `Bloqueo con id ${id} no encontrado.` });
      return res.status(200).json(updated);
    } catch (error) {
      console.error("Error al actualizar bloqueo:", error);
      return res.status(500).json({ message: "Error en el servidor." });
    }
  },

  async deleteBloqueo(req, res) {
    try {
      const { id } = req.params;
      const deleted = await bloqueoService.deleteBloqueo(id);
      if (!deleted) return res.status(404).json({ message: `Bloqueo con id ${id} no encontrado.` });
      return res.status(204).send();
    } catch (error) {
      console.error("Error al eliminar bloqueo:", error);
      return res.status(500).json({ message: "Error en el servidor." });
    }
  },

  // Nuevo método para obtener bloqueos por spa y rango de fechas
  async getBloqueosByDateRange(req, res) {
    try {
      const { idSpa, startDate, endDate } = req.query;
      if (!idSpa || !startDate || !endDate) {
        return res.status(400).json({ message: "Se requieren idSpa, startDate y endDate." });
      }
      const bloqueos = await bloqueoService.getBloqueosByDateRange(idSpa, startDate, endDate);
      return res.status(200).json(bloqueos);
    } catch (error) {
      console.error("Error al obtener bloqueos por rango de fecha:", error);
      return res.status(500).json({ message: "Error en el servidor." });
    }
  },

};

export { bloqueoCabinaController };

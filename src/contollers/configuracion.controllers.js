import { configuracionService } from "../services/configuracion.services.js";

const configuracionController = {
  async getEstadoAgenda(req, res) {
    try {
      const { idSpa } = req.query;

      if (!idSpa) {
        return res.status(400).json({ message: "El parámetro 'idSpa' es requerido." });
      }

      const estadoAgenda = await configuracionService.getConfiguracionByClave("estado_agenda", idSpa);

      if (!estadoAgenda) {
        return res.status(404).json({ message: "Configuración 'estado_agenda' no encontrada para el idSpa proporcionado." });
      }

      res.status(200).json({ estado: estadoAgenda.valor });
    } catch (error) {
      console.error("Error al obtener el estado de la agenda:", error);
      res.status(500).json({ message: "Error al obtener el estado de la agenda." });
    }
  },

  async getFechaApertura(req, res) {
    try {
      const { idSpa } = req.query;

      if (!idSpa) {
        return res.status(400).json({ message: "El parámetro 'idSpa' es requerido." });
      }

      const fechaApertura = await configuracionService.getConfiguracionByClave("fecha_apertura_agenda", idSpa);

      if (!fechaApertura) {
        return res.status(404).json({ message: "Configuración 'fecha_apertura_agenda' no encontrada para el idSpa proporcionado." });
      }

      res.status(200).json({ fecha_apertura: fechaApertura.valor });
    } catch (error) {
      console.error("Error al obtener la fecha de apertura de la agenda:", error);
      res.status(500).json({ message: "Error al obtener la fecha de apertura de la agenda." });
    }
  },

  async updateEstadoAgenda(req, res) {
    try {
      const { idSpa: id_spa } = req.query; // Ajusta el nombre de la variable
      const { estado } = req.body;
  
      if (!id_spa) {
        return res.status(400).json({ message: "El parámetro 'idSpa' es requerido." });
      }
  
      if (typeof estado !== "boolean") {
        return res.status(400).json({ message: "El estado debe ser un valor booleano." });
      }
  
      const updated = await configuracionService.updateConfiguracion("estado_agenda", id_spa, estado);
  
      res.status(200).json({
        message: "Estado de la agenda actualizado.",
        configuracion: updated,
      });
    } catch (error) {
      console.error("Error al actualizar el estado de la agenda:", error);
      res.status(500).json({ message: "Error al actualizar el estado de la agenda." });
    }
  },

  async updateFechaApertura(req, res) {
    try {
      const { idSpa } = req.query;
      const { fecha_apertura } = req.body;

      if (!idSpa) {
        return res.status(400).json({ message: "El parámetro 'idSpa' es requerido." });
      }

      if (!fecha_apertura || isNaN(Date.parse(fecha_apertura))) {
        return res.status(400).json({ message: "La fecha de apertura debe ser una fecha válida." });
      }

      const updated = await configuracionService.updateConfiguracion("fecha_apertura_agenda", idSpa, fecha_apertura);

      res.status(200).json({
        message: "Fecha de apertura de la agenda actualizada.",
        configuracion: updated,
      });
    } catch (error) {
      console.error("Error al actualizar la fecha de apertura de la agenda:", error);
      res.status(500).json({ message: "Error al actualizar la fecha de apertura de la agenda." });
    }
  },
};

export { configuracionController };

import { Configuracion } from "../models/index.js";

const configuracionService = {
    async getConfiguracionByClave(clave, id_spa) {
        try {
          return await Configuracion.findOne({ where: { clave, id_spa } });
        } catch (error) {
          console.error(`Error al obtener configuración con clave ${clave} y id_spa ${id_spa}:`, error);
          throw new Error("Error al obtener configuración.");
        }
      },
      async updateConfiguracion(clave, id_spa, valor) {
        try {
          const configuracion = await Configuracion.findOne({ where: { clave, id_spa } });
          if (!configuracion) {
            throw new Error(`Configuración con clave ${clave} e id_spa ${id_spa} no encontrada`);
          }
      
          // Forzar a texto antes de guardar
          return await configuracion.update({ valor: String(valor) });
        } catch (error) {
          console.error(`Error al actualizar configuración con clave ${clave} e id_spa ${id_spa}:`, error);
          throw new Error("Error al actualizar configuración.");
        }
      },      
      
  async createConfiguracion(data) {
    try {
      return await Configuracion.create(data);
    } catch (error) {
      console.error("Error al crear nueva configuración:", error);
      throw new Error("Error al crear configuración.");
    }
  },
};

export { configuracionService };

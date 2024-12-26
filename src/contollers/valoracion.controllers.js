//import { Valoracion } from "../models/Valoracion.js";
import { valoracionService } from "../services/valoracion.services.js";

const valoracionController = {
    // Obtener todas las valoraciones filtradas por idSpa
    async getValoraciones(req, res) {
        try {
            const idSpa = req.query.idSpa;

            if (!idSpa) {
                return res.status(400).json({ message: "El parámetro idSpa es requerido" });
            }

            const valoraciones = await valoracionService.getAllValoraciones(idSpa);
            res.status(200).json(valoraciones);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener las valoraciones', error });
        }
    },

    // Obtener valoraciones dentro de un rango de fechas filtradas por idSpa
    async getValoracionesByDateRange(req, res) {
        try {
            const { startDate, endDate, idSpa } = req.query;

            if (!idSpa) {
                return res.status(400).json({ message: "El parámetro idSpa es requerido" });
            }

            const valoraciones = await valoracionService.getValoracionesByDateRange(idSpa, startDate, endDate);
            res.status(200).json(valoraciones);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener las valoraciones por rango de fechas', error });
        }
    },

    // Búsqueda de valoraciones con filtro por idSpa
    async searchValoraciones(req, res) {
        try {
            const { keyword, fecha, idSpa } = req.query;

            if (!idSpa) {
                return res.status(400).json({ message: "El parámetro idSpa es requerido" });
            }

            const valoraciones = await valoracionService.searchValoraciones({ keyword, fecha, idSpa });
            res.status(200).json(valoraciones);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en la búsqueda de valoraciones', error });
        }
    },

    // Obtener una valoración por ID
    async getValoracionById(req, res) {
        const { id } = req.params;

        try {
            const valoracion = await valoracionService.getValoracionById(id);

            if (!valoracion) {
                return res.status(404).json({ message: `Valoración con ID ${id} no encontrada` });
            }

            res.status(200).json(valoracion);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: `Error al obtener la valoración con ID ${id}`, error });
        }
    },

    // Crear una nueva valoración
    async createValoracion(req, res) {
        try {
            const newValoracion = await valoracionService.createValoracion(req.body);
            res.status(201).json(newValoracion);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al crear la valoración', error });
        }
    },

    // Actualizar una valoración existente
    async updateValoracion(req, res) {
        const { id } = req.params;

        try {
            const updatedValoracion = await valoracionService.updateValoracion(id, req.body);

            if (!updatedValoracion) {
                return res.status(404).json({ message: `Valoración con ID ${id} no encontrada` });
            }

            res.status(200).json(updatedValoracion);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: `Error al actualizar la valoración con ID ${id}`, error });
        }
    },

    // Eliminar una valoración
    async deleteValoracion(req, res) {
        const { id } = req.params;

        try {
            const deletedValoracion = await valoracionService.deleteValoracion(id);

            if (!deletedValoracion) {
                return res.status(404).json({ message: `Valoración con ID ${id} no encontrada` });
            }

            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: `Error al eliminar la valoración con ID ${id}`, error });
        }
    }
};

export { valoracionController };

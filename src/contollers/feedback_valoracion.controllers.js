import { Feedback_valoracion } from "../models/Feedback_valoracion.js";
import { feedbackValoracionService } from "../services/feedback_valoracion.services.js";

const feedbackValoracionController = {
    
    async getAllFeedbacks(req, res) {
        try {
            const feedbacks = await feedbackValoracionService.getAllFeedbacks();
            res.status(200).json(feedbacks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    async getFeedbackById(req, res) {
        const { id } = req.params;
        try {
            const feedback = await feedbackValoracionService.getFeedbackById(id);
            if (!feedback) {
                res.status(404).json({ message: `Feedback with id ${id} not found` });
            } else {
                res.status(200).json(feedback);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: `Error retrieving feedback with id ${id}` });
        }
    },

    async createFeedback(req, res) {
        try {
            const newFeedback = await feedbackValoracionService.createFeedback(req.body);
            res.status(201).json(newFeedback);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating feedback' });
        }
    },

    async updateFeedback(req, res) {
        const { id } = req.params;
        try {
            const updatedFeedback = await feedbackValoracionService.updateFeedback(id, req.body);
            if (!updatedFeedback) {
                res.status(404).json({ message: `Feedback with id ${id} not found` });
            } else {
                res.status(200).json(updatedFeedback);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: `Error updating feedback with id ${id}` });
        }
    },

    async deleteFeedback(req, res) {
        const { id } = req.params;
        try {
            const deletedFeedback = await feedbackValoracionService.deleteFeedback(id);
            if (!deletedFeedback) {
                res.status(404).json({ message: `Feedback with id ${id} not found` });
            } else {
                res.status(204).send();
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: `Error deleting feedback with id ${id}` });
        }
    },
}

export { feedbackValoracionController };

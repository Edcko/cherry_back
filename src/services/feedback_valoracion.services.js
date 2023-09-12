import { Feedback_valoracion } from "../models/index.js";

const feedbackValoracionService = {
    
    async getAllFeedbacks() {
        return await Feedback_valoracion.findAll();
    },

    async getFeedbackById(id) {
        return await Feedback_valoracion.findByPk(id);
    },

    async createFeedback(data) {
        return await Feedback_valoracion.create(data);
    },

    async updateFeedback(id, data) {
        const feedback = await Feedback_valoracion.findOne({ where: { id_feedback: id } });
        if (feedback) {
            return await feedback.update(data);
        } else {
            return null;
        }
    },

    async deleteFeedback(id) {
        const feedback = await Feedback_valoracion.findOne({ where: { id_feedback: id } });
        if (feedback) {
            await feedback.destroy();
        }
        return feedback;
    },
}

export { feedbackValoracionService };

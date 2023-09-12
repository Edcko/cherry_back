import { Router } from "express";
import passport from "passport";
import { feedbackValoracionController } from "../controllers/feedback_valoracion.controllers.js";

const router = Router()

router.get('/feedbacks', passport.authenticate("jwt", { session: false }), feedbackValoracionController.getAllFeedbacks);
router.get('/feedback/:id', passport.authenticate("jwt", { session: false }), feedbackValoracionController.getFeedbackById);
router.post('/feedback', passport.authenticate("jwt", { session: false }), feedbackValoracionController.createFeedback);
router.put('/feedback/:id', passport.authenticate("jwt", { session: false }), feedbackValoracionController.updateFeedback);
router.delete('/feedback/:id', passport.authenticate("jwt", { session: false }), feedbackValoracionController.deleteFeedback);

export default router;

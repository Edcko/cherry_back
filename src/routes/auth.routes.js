import { Router } from "express";
import { authController } from "../contollers/auth.controllers.js";

const router = Router();

router.post("/auth/login", authController.login);

export default router;